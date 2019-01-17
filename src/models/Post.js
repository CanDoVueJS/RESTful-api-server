module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: '포스트 제목이 너무 깁니다',
        },
      },
    },
    contents: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 500],
          msg: '포스트는 최소 1자 이상 최대 500자 이하여야 합니다.',
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
