module.exports = (sequelize, DataTypes) => {
  const Memo = sequelize.define('Memo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Memos',
    timestamps: false,
  });
  return Memo;
};
