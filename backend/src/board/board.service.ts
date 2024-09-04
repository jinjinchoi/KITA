import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { IBoard } from './interface/boaard.interface';

@Injectable()
export class BoardService {

  // 보드 모델 주입
  constructor(
    @InjectModel(Board)
    private readonly BoardEntity : typeof Board
  ) {}

  // 특수문자 escape 함수
  private exceptSpecialChar(word : string) : string {
    return word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 텍스트 강조 함수
  private highlightText(text : string, searchTerm : string) : string {
    if (!searchTerm.trim()) return text;

    const escapedTerm = this.exceptSpecialChar(searchTerm);
    const filterdTerm = new  RegExp(`(${searchTerm})`, 'gi');
    return text.replace(filterdTerm, '<mark>$1</mark>')
  }

  // DTO로 받아와서 메서드로 sql에 저장
  async create(createBoardDto: CreateBoardDto, category:string): Promise<Board> {
    try {
      const { boardTitle, boardContent, uid, unickname, uprofile, boardFile } = createBoardDto;
      return await this.BoardEntity.create({
        boardTitle, boardContent, uid, unickname, uprofile, boardFile, categories: category
      })
    } catch (err) {
      if(err.message === "SequelizeForeignKeyConstraintError") {
        throw new Error("ForeignKeyConstraintError");
      }
      throw err;
    }
  }

  // 모든 게시물을 가져온다.
  async findAll(limit : number, offset : number, category?: string): Promise<Board[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    const whereCondition : any = category ? {categories:category} : {}; 

    return await this.BoardEntity.findAll({
      where : whereCondition,
      limit : safeLimit,
      offset : safeOffset,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  // 게시물 검색 로직
  async searchBoard(limit : number, offset : number, word : string) : Promise<IBoard[]>  {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;

    try {
      const foundBoard = await this.BoardEntity.findAll({
        where : {
          [Op.or] : [
            {boardTitle : {[Op.like] : `%${word}%`}},
            {boardContent : {[Op.like] : `%${word}%`} },
          ],
        },
        limit : safeLimit,
        offset : safeOffset,
        order : [['createdAt', 'DESC']],
      });

      
      return foundBoard.map(item => {
        const plainItem = item.toJSON() as IBoard; // Sequelize 모델 인스턴스를 plain object로 변환하고 IBoard 타입으로 캐스팅
        return {
          ...plainItem,
          boardTitle: this.highlightText(plainItem.boardTitle, word),
          boardContent: this.highlightText(plainItem.boardContent, word),
        };
      }); 
    } catch(err) {
      console.error('Error occurred:', err.message);
      throw err;
    }
  }
  
}
