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
    tabelName: 'Comments',
    timestamps: true,
  });
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
