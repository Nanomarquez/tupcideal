const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('VideoCard', {
        name:{
            type: DataTypes.STRING,
            allowNull:false,
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
        chipset: {
            type: DataTypes.STRING,
        },
        memory: {
            type: DataTypes.STRING,
        },
        core_clock: {
            type: DataTypes.STRING,
        },
        boost_clock: {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING,
        },
        length: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
      })
};