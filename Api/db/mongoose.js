// this file use to handle the connection logic to the mongoDB 
const dependencies = require('../dependencies');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/TaskManager").then(()=>{
    console.log("DB Connected Successfully..!!")
}).catch((err)=>{
    console.log('Error while connecting to the DB');
})

module.exports = {
    mongoose
}