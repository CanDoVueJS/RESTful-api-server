'use strict';
const format = require('date-fns/format');
const addHour = require('date-fns/add_hours');
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: '이미 가입된 이메일 입니다.',
      },
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
        isEven: function (value) {
          if (value.length <= 2) {
            throw new Error('이름은 최소 2자 이상 입력해주세요.');
          }
          if (value.length > 10) {
            throw new Error('이름은 최대 10자 이내로 입력해주세요.');
          }
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
      get () {
        const t = addHour(this.getDataValue('createdAt'), 9);
        return format(t, 'YYYY-MM-DD HH:mm');
      },
    },
    updatedAt: {
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      type: DataTypes.TIME,
      get () {
        const t = addHour(this.getDataValue('updatedAt'), 9);
        return format(t, 'YYYY-MM-DD HH:mm');
      },
    },
  }, {
    tableName: 'Users',
    timestamps: true,
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post);
  };
  User.prototype.toJSON = function () {
    const value = Object.assign({}, this.get());
    delete value.password;
    delete value.createdAt;
    delete value.updatedAt;
    return value;
  };
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.dataValues.password);
  };
  return User;
};
