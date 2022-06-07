'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hero.hasMany(models.Image, {
        foreignKey: 'heroId',
      });
      Hero.belongsToMany(models.Superpower, {
        through: 'heroes_to_powers',
        foreignKey: 'superpowerId',
      });
    }
  }
  Hero.init(
    {
      nickName: {
        field: 'nick_name',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      realName: {
        field: 'real_name',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      originDescription: {
        field: 'origin_description',
        allowNull: false,
        type: DataTypes.TEXT,
      },
      catchPrase: { field: 'catch_prase', type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Hero',
      tableName: 'heroes',
      underscored: true,
    }
  );
  return Hero;
};
