const { MongoClient } = require('mongodb');
const express = require('express')
var bpr = require('body-parser')

const uri = "mongodb+srv://webuser123:webuser123@cluster0.xg73t.mongodb.net/nimdb?retryWrites=true&w=majority";
const client = new MongoClient(uri);

var app =express()
app.use(bpr.urlencoded({
    extended: true
}))

var userdata = []

client.connect(err => {
  const collection = client.db("nimdb").collection("nimdbcollection1");
  console.log("db connected!")
  // perform actions on the collection object
  app.post('/adduser', (req, res) =>{
    collection.insertOne(req.body).then(result =>{
        console.log(result)
        res.send('User added to db!')
    })
})

app.get("/", (req, res) => {
    collection.find().toArray().then(response => {
        //console.log(response)
        res.render('index.ejs', {userd: response })
    })
})

app.get("/getuser", (req, res) =>{
    collection.findOne().then(response =>{
        res.send(response)
    })
})

app.get("/getallusers", (req, res) =>{
  collection.find().toArray().then(response =>{
      res.send(response)
  })
})
  //client.close();
});

app.listen(8087, () => {
    console.log('server is ready')
})