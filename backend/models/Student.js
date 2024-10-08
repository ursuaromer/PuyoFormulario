const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Student = sequelize.define('Student',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Student