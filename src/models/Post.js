module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 255],
          msg: '게시물의 제목은 최소 1자 이상 최대 255자 이하여야 합니다.',
        },
      },
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 500],
          msg: '게시물의 내용은 최소 1자 이상 최대 500자 이하여야 합니다.',
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
    tableName: 'Posts',
    timestamps: true,
  });
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User);
  };
  Post.prototype.toJSON = function () {
    const value = Object.assign({}, this.get());
    value.user = value.User;
    delete value.User;
    delete value.UserId;
    return value;
  };
  return Post;
};
