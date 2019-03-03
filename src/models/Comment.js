module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: '댓글은 최소 1자 이상 최대 255자 이하여야 합니다.',
        },
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
    tableName: 'Comments',
    timestamps: true,
  });
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
  };
  Comment.prototype.toJSON = function () {
    const value = Object.assign({}, this.get());
    value.user = value.User;
    delete value.User;
    delete value.UserId;
    delete value.PostId;
    return value;
  };
  Comment.prototype.isMyComment = function (user) {
    const value = Object.assign({}, this.get());
    return user.id === value.UserId;
  };
  return Comment;
};
