const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty:{
      type: DataTypes.INTEGER,
      // validate:{             TO CHECK LATER!
      //   min: 1,
      //   max: 5
      // }
    },
    duration:{
      type: DataTypes.INTEGER,
    },
    season:{
      type: DataTypes.ENUM('summer','fall','winter','spring')
    }
  });
};
