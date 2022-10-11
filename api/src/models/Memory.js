const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('memory', {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        speed: {
            type: DataTypes.STRING,
        },
        modules: {
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
        }
    })
}