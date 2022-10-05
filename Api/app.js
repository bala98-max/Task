const express = require('express');
const Dependencies = require('./dependencies')

const app = express();

require('dotenv').config();

/**
 * GET /lists
 * Purpose : get all the lists
 */
app.get('/lists',(req,res)=>{
   //We want to return the array of all the lists from the database
})

/**
 * POST /list
 * Purpose : Create a new list
 */
app.post('/lists',(req,res)=>{
    //We want to create a list and return the new list documents to the user(which includes the user id)

})

/**
 * PATCH /lists:id
 * Purpose : update a list
 */
app.patch('/lists/:id',(req,res)=>{
    // we want to update the list (the list document with id url) the new value specified in the JSON
})
/**
 * Delete /list:id
 * Purpose : Delete a particular list
 */
app.delete('/lists/:id',(req,res)=>{
    //we want to delete a specified list(documnet id in the url)
})


app.listen(process.env.PORT,()=>{
    console.log(Dependencies.info,`Server starts at port : ${process.env.PORT}`)
})