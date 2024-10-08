const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/example1',{
    logging: false
})

module.exports=sequelize