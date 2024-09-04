import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FaqBoard } from './entity/faq.entity';
import { IFaqDto } from './dto/faq.dto';
import { Op } from 'sequelize';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(FaqBoard)
    private readonly faqModel: typeof FaqBoard
  ){}

  // 글 추가 
  create(faqTitle:string, faqContent:string){
    try {
      return this.faqModel.create({
        faqTitle, faqContent  
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 글 전체 조회
  async findAll():Promise<IFaqDto[]>{
    try {
      return await this.faqModel.findAll()
    } catch (error) {
      console.log(error, "서비스에서 에러 났어")
    }
  }

  // 글 수정
  async modifyFindOne(id:number):Promise<FaqBoard>{
    try {
      return await this.faqModel.findOne({where: {id}})
    } catch (error) {
      console.log("글 수정할 인풋 불러오기")
      console.log(error)
    }
  }

  // 글 업데이트
  async update(id:number, faqTitle:string, faqContent:string){
    try {
      return await this.faqModel.update({faqTitle, faqContent},{ where: {id} })
    } catch (error) {
      console.log(error, "글 업데이트가 안됐어")
    }
  }
  
  // 글 삭제
  delete(id: number):Promise<number>{
    try {
      return this.faqModel.destroy({where:{id}})
    } catch (error) {
      console.log(error, "글 삭제가 안됨")
    }
  }
  
  async queryFind(keyword: string){
    return await this.faqModel.findAll({
      attributes : ['id', 'faqTitle', 'faqContent'],
      where: {
        [Op.or]: [{
          faqTitle : { [Op.like] : `%${keyword}%`},
        },
      ]
      }
    })
  }
}
