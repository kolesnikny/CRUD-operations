'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageSrc: {
        field: 'image_src',
        allowNull: false,
        type: Sequelize.STRING,
      },
      heroId: {
        field: 'hero_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'heroes',
            key: 'id',
          },
        },
        onDelete: 'cascade',
        onUpdate: 'restrict',
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  },
};
