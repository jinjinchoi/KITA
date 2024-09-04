import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Board } from "src/board/entities/board.entity";


@Table({
    tableName: "likes",
})
export class Like extends Model<Like>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;

    // 유저 정보 (추후 연결 필요)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    uid: string

    
    // 좋아요한 보드 정보
    @ForeignKey(()=> Board)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    boardId: number;

    // 카테고리정보
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category: string;

    // 본문에 속함
    @BelongsTo(()=>Board)
    postId!: Board
}
