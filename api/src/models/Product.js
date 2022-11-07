const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categories: {
        type: DataTypes.ENUM('Case', 'CPU', 'InternalHardDrive', 'Memory', 'Motherboard', 'PowerSupply', 'VideoCard','Keyboard', 'Monitor', 'Mouse'),
      },
      name: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      rating_count: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      id_table: {
        type: DataTypes.INTEGER,
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      brand: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};
