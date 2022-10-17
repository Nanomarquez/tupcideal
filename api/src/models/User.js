const { urlencoded } = require("express");
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 50],
            msg: "El nombre debe tener entre 2 y 50 letras",
          },
        },
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: "El apellido solo puede contener letras",
          },
          len: {
            args: [2, 50],
            msg: "El apellido debe tener entre 2 y 50 letras",
          },
        },
      },

      adress: {
        type: DataTypes.STRING,
        allowNull: true,
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
