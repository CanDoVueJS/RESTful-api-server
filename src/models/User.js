'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: '올바르지 않은 이메일 입니다.',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set (password) {
        bcrypt.hash(password, null, null, (err, hash) => {
          if (err) throw new Error(err);
          this.setDataValue('password', hash);
        });
      },
      get () {
        return null;
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 30],
          msg: '이름이 너무 깁니다',
        },
      },
    },
    isAdmin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
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
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post);
  };
  User.prototype.toJSON = function () {
    const value = Object.assign({}, this.get());
    delete value.password;
    return value;
  };
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.dataValues.password);
  };
  return User;
};
