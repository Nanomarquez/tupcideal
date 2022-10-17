const { urlencoded } = require("express");
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo y le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 12],
            msg: "La contraseña debe tener entre 6 y 12 caracteres",
          },
        },
      },

      initial_date: {
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
      admin: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
    }
  );
};
