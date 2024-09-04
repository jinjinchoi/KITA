import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "faqs",
  timestamps: true,
  paranoid: false
})
export class FaqBoard extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  faqTitle : string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  faqContent: string;
}