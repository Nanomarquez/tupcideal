const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Purchase", {
    id: {
      type: DataTypes.UUID, //alfanumerico random
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // allowNull = Permite un vacio ----> seteamos en falso
    },
    totalprice: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
};
