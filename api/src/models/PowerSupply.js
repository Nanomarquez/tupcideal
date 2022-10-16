const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
      "PowerSupply",
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
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
        form_factor: {
          type: DataTypes.STRING,
        },
        efficiency_rating: {
          type: DataTypes.STRING,
        },
        wattage: {
          type: DataTypes.STRING,
        },
        modular: {
          type: DataTypes.STRING,
        },
        color: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
};