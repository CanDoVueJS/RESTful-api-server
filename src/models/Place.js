const { User } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: '맛집 이름이 너무 깁니다',
        },
      },
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: User,
        key: 'id',
      },
    },
    createdAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME,
    },
    updatedAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME,
    },
  }, {
    tableName: 'Places',
    timestamps: true,
  });
  Place.associate = function (models) {
    // associations can be defined here
  };
  return Place;
};
