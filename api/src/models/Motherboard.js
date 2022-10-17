const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "Motherboard",
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
      "socket_/_cpu": {
        type: DataTypes.STRING,
      },
      form_factor: {
        type: DataTypes.STRING,
      },
      memory_max: {
        type: DataTypes.STRING,
      },
      memory_slots: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
          image: {
      type: DataTypes.STRING
    },
    {
      timestamps: false,

    }
  );
};