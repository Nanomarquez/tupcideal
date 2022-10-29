const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("WareHouse", {
    id: {
      type: DataTypes.UUID, //alfanumerico random
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
      primaryKey: true,
    },
    precio: {
      type: DataTypes.INTEGER,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
    ratingProm: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  },
  {
    timestamps: false,
  }
  );
};
