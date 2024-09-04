// 유저 테이블 생성

import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "user",
    timestamps: true,
    paranoid: true
})
export class User extends Model<User> {
    // 인덱스
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull : false,
    })
    id!: number;

    // 유저 아이디
    @Column({
        type: DataType.STRING,
        allowNull : false,
        unique: true,
    })
    uid!: string;

    // 패스워드
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    upw!: string;

    // 닉네임
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    unickname!: string;

    // 이메일
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    uemail!: string;

    // 전화번호
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
        unique: true
    })
    uphone!: number;

    // 관리자 여부
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false
    })
    isAdmin!: boolean;

    // 유저 프사 링크
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    uprofile?:string

    // 유저 한줄 메세지
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    umessage?:string

    // @HasMany(()=> Board)
    // boards!: Board[];
}