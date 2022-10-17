const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define(
    "Case",
    {
      name: {
        type: DataTypes.STRING,
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
      type: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      power_supply: {
        type: DataTypes.STRING,
      },
      side_panel_window: {
        type: DataTypes.STRING,
      },
      'external_5.25"_bays': {
        type: DataTypes.STRING,
      },
      'internal_3.5"_bays': {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false,
    }
  );
};