import { DataTypes } from 'sequelize'
// 加密密碼字串用
import { generateHash } from '#db-helpers/password-hash.js'

export default async function (sequelize) {
  return sequelize.define(
    'UserTeacher',
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
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
   
      identity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY, //只需要日期
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
      valid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // hooks: {
      //   // 建立時產生密碼加密字串用
      //   beforeCreate: async (user) => {
      //     if (user.password) {
      //       user.password = await generateHash(user.password)
      //     }
      //   },
      //   // 更新時產生密碼加密字串用
      //   beforeUpdate: async (user) => {
      //     if (user.password) {
      //       user.password = await generateHash(user.password)
      //     }
      //   },
      // },
      tableName: 'user_teacher', //直接提供資料表名稱
      timestamps: false, // 使用時間戳
      paranoid: false, // 軟性刪除
      underscored: true, // 所有自動建立欄位，使用snake_case命名
      // createdAt: 'created_at', // 建立的時間戳
      // updatedAt: 'updated_at', // 更新的時間戳
    }
  )
}
