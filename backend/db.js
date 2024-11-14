const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:romer180105@localhost:5432/example1',{
    logging: false
})

module.exports=sequelize