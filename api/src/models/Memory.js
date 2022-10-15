const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Memory', {
        name: {
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
        speed: {
            type: DataTypes.STRING,
        },
        modules: {
            type: DataTypes.STRING,
        },
        'price_/_gb': {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING,
        },
        first_word_latency: {
            type: DataTypes.STRING,
        },
        cas_latency: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    })
};