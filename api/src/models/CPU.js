const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CPU', {
    name: {
      type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
    rating_count: {
        type: DataTypes.INTEGER
    },
    price_usd: {
        type: DataTypes.FLOAT
    },
    core_count: {
        type: DataTypes.STRING
    },
    core_clock: {
        type: DataTypes.STRING
    },
    boost_clock: {
        type: DataTypes.STRING
    },
    tdp: {
        type: DataTypes.STRING
    },
    integrated_graphics: {
        type: DataTypes.STRING,
    },
    smt: {
        type: DataTypes.BOOLEAN
    }
  } , {
    timestamps: false
    });
};
