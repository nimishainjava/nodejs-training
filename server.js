
const express = require('express')
var bpr = require('body-parser')
var _ = require('underscore');

var app =express()
app.use(bpr.urlencoded({
    extended: true
}))

var userdata = []
var uid = 1

app.get("/", (req, res) => {
    res.render('index.ejs', {userd: userdata })
})
var deptdata = [
    {
        name: 'HR',
        name: 'Tech',
        name: 'Finance'
    }
]
app.get("/loadusers", (req, res) => {
    res.json(userdata)
})

app.get("/loaduser/:id", (req, res) => {
    var data = parseInt(req.params.id)
    var mtd = _.findWhere(userdata, {id:data})
    // userdata.forEach(function(todo) {
    //     if (data === todo.id) {
    //         mtd =todo
    //     }
    // })
    if(mtd) {
        res.json(mtd)
    } else {
        res.status(404).send()
    }
})

app.delete("/removeuser/:id", (req, res) => {
    var data = parseInt(req.params.id)
    var mtd = _.findWhere(userdata, {id:data})
    if(mtd) {
        userdata= _.without(userdata, mtd)
        res.send('user has been deleted')
    } else {
        res.status(404).send()
    }
})

app.put("/updateuser/:id", (req, res) => {
    var data = parseInt(req.params.id)
    var mtd = _.findWhere(userdata, {id:data})
    if(mtd) {
        updatedobject= _.extend(mtd, req.body)
        userdata=_.without(userdata, mtd)
        userdata.push(updatedobject)
        res.send("user has been updated")
    } else {
        res.status(404).send()
    }
})


app.post('/adduser', (req, res) => {
    var data = req.body
    data.id = uid++
    userdata.push(data)
    res.send('user is added')
})
app.get("/loaddepartments", (req, res) => {
    res.json(deptdata)
})

app.listen(8086, () => {
    console.log('server is ready')
})