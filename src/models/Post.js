const format = require('date-fns/format');
const addHour = require('date-fns/add_hours');

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
    tableName: 'Posts',
    timestamps: true,
  });
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
  };
  Post.prototype.toJSON = function () {
    const value = Object.assign({}, this.get());
    value.user = value.User;
    value.comments = value.Comments;

    delete value.User;
    delete value.Comments;
    delete value.UserId;

    return value;
  };
  Post.prototype.isMyPost = function (user) {
    const value = Object.assign({}, this.get());
    return user.id === value.UserId;
  };
  Post.prototype.hasComment = async function (commentId) {
    const comments = await this.getComments();
    return comments.some(comment => comment.dataValues.id.toString() === commentId);
  };
  return Post;
};
