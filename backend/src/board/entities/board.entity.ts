// 게시판 테이블 생성

import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import { Reply } from "src/comment/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";

@Table({
    tableName: "board",
    timestamps: true,
    paranoid: true,
})
export class Board extends Model<Board> {
    // id(인덱스)
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    // 제목
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    boardTitle!: string;

    // 본문
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    boardContent!: string;

    // 조회수
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    boardView!: number;

    // 유저 아이디
    // @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    uid!: string;

    // 유저 닉네임
    // @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    unickname!: string;

    // 유저 프로필 사진
    // @ForeignKey(()=> User)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    uprofile?: string;

    // 카테고리
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categories!: string;

    // 파일
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    boardFile?: string;

    // 좋아요
    @Column({
        type : DataType.INTEGER,
        allowNull : false,
        defaultValue: 0,
    })
    boardLike!: number;

    // 댓글 수 저장
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue : 0
    })
    numberOfComment! : number;

    // User table의 uid와 Borad table의 uid를 연결
    // @BelongsTo(() => User, { foreignKey: 'uid' })
    // user!: User;


    // @BelongsTo(() => User, { foreignKey: 'unickname' })
    // userNickname!: User;

    // @BelongsTo(() => User, { foreignKey: 'uProfile' })
    // userProfile: User;

    // 본문과 댓글 연결
    @HasMany(()=> Reply)
    comments!:Reply[];

    // 본문과 좋아요 연결
    @HasMany(()=>Like)
    likes!:Like[];
}
