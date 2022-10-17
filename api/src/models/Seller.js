const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Seller",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      store_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Ingresa un email valido",
          },
        },
      },
      
      phone_number: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          isInt: {
            args: true,
            msg: "El número telefónico solo debe contener números",
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
