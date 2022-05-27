const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const userPage = require('./routes/user')
require('./db')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/user',userPage)

app.set('view engine','pug')
app.set('views','./views')

app.get('/',(req,res)=>{
    res.send('OOK')
})

app.get('*',(req,res)=>{
    res.send('Resource not Found')
})

const port = config.get('port') || 8080
mongoose.connection.once('open',()=>{
    app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
    })
    console.log('DB CONNECTED')
})
