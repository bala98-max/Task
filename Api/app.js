const express = require('express');
const bodyParser = require('body-parser');
const Dependencies = require('./dependencies')

const mongoose = require('./db/mongoose')

const app = express();

require('dotenv').config();

//load Mongoose models
const { List , Task } = require('./db/models/index')

// Load middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * GET /lists
 * Purpose : get all the lists
 */
app.get('/lists',(req,res)=>{
   //We want to return the array of all the lists from the database
   List.find({}).then((lists)=>{
    res.send(lists)
   })
})

/** 
 * POST /list
 * Purpose : Create a new list
 */
app.post('/lists',(req,res)=>{
    //We want to create a list and return the new list documents to the user(which includes the user id)
    let tittle = req.body.tittle;
    const list = new List({
        tittle
    })

    list.save().then((listDoc)=>{
        //the full list document need to return include id
        res.send(listDoc)
    }).catch((err)=>{
        res.send(err)
    })
})

/**
 * PATCH /lists:id
 * Purpose : update a list
 */
app.patch('/lists/:id',(req,res)=>{
    // we want to update the list (the list document with id url) the new value specified in the JSON
    List.findByIdAndUpdate({
        _id : req.params.id
    },{
        $set : req.body
    }).then(()=>{
        res.sendStatus(200)
    }).catch((err)=>{
        res.send("can't update a list",err)
    })
})
/**
 * Delete /list:id
 * Purpose : Delete a particular list
 */
app.delete('/lists/:id',(req,res)=>{
    //we want to delete a specified list(documnet id in the url)
    List.findOneAndRemove({
        _id : req.params.id
    }).then((removelistDoc)=>{
        res.send(removelistDoc)
    })
})

/**
 * GET /lists/listid/tasks
 * Purpose : Get all the tasks belongs to the list
 */
app.get('/lists/:listid/tasks',(req,res)=>{
    // Want to return the task that belong to the specific list
    Task.find({
        _listId : req.params.listid
    }).then((tasks)=>{
        res.send(tasks)
    })
})


/**
 * POST /lists/listid/tasks
 * Purpose : Create a task to the specified list
 */
 app.post('/lists/:listid/tasks',(req,res)=>{
    // Want to create a new task in a task specified by list
    console.log('tittle',req.body.tittle,'listid',req.params.listid)
    let newtask = new Task({
        tittle : req.body.tittle,
        _listId : req.params.listid,
    });
    console.log('newtask-----------',newtask)
    newtask.save().then((doc)=>{
        res.send(doc)
    })
})





app.listen(process.env.PORT,()=>{
    console.log(Dependencies.info,`Server starts at port : ${process.env.PORT}`)
}) 