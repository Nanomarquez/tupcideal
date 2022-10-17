const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "InternalHardDrive",
    {
      name: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.UUID, //alfanumerico random
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      rating_count: {
        type: DataTypes.INTEGER,
      },
      price_usd: {
        type: DataTypes.FLOAT,
      },
      capacity: {
        type: DataTypes.STRING,
      },
      "price_/_gb": {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      cache: {
        type: DataTypes.STRING,
      },
      form_factor: {
        type: DataTypes.STRING,
      },
      interface: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};