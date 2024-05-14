import { DataTypes } from 'sequelize'

export default async function (sequelize) {
  return sequelize.define(
    'Collection',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pdltat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      valid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'collection', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
