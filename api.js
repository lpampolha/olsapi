require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
const apiRoutes = require('./src/routes')
const connectDB = require('./config/db')
const PORT = process.env.PORT

//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(fileUpload())
app.use(express.static(__dirname+'./public'))

//Conexão com a base
connectDB()

//Define Rotas
//app.use('/', apiRoutes, (req,res) => res.send(`Sistema OLS`))
app.use('/', apiRoutes)

app.listen(PORT, () => {console.log('Server Started!')})