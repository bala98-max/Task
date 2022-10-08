const mongoose = require('mongoose');

const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const TaskSchema = new mongoose.Schema({
    tittle:{
        type : String,
        required:true,
        minlength:1,
        trim:true
    },
    _listId:{
        type:ObjectId,
        required:true
    }
})

const Task = mongoose.model('Task',TaskSchema);

module.exports = {Task}