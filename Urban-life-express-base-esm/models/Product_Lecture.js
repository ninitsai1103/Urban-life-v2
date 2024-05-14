import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Product_Lecture',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      change_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hrs_express: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pdlt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      starting_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ending_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      starting_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      ending_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      valid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'product_lecture', //直接提供資料表名稱
      timestamps: true, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      createdAt: 'created_at', // 建立的時間戳
      updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
