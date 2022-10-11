const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Motherboard', {
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
    "socket_/_cpu": {
        type: DataTypes.STRING
    },
    form_factor: {
        type: DataTypes.STRING
    },
    memory_max: {
        type: DataTypes.STRING
    },
    memory_slots: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    }
  });
};