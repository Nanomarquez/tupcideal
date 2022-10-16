const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "CPU",
    {
      name: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.UUID, //alfanumerico random
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
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
      core_count: {
        type: DataTypes.STRING,
      },
      core_clock: {
        type: DataTypes.STRING,
      },
      boost_clock: {
        type: DataTypes.STRING,
      },
      tdp: {
        type: DataTypes.STRING,
      },
      integrated_graphics: {
        type: DataTypes.STRING,
      },
      smt: {
        type: DataTypes.BOOLEAN,
      },
      socket: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
