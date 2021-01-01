const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3001

//Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(fileUpload())

//Conexão com a base
connectDB()

//Define Rotas
app.get('/', (req,res) => res.send(`Sistema OLS`))
app.use('/ads', require('./src/routes/ads'))
app.use('/categories', require('./src/routes/categories'))
app.use('/states', require('./src/routes/states'))
app.use('/user', require('./src/routes/user'))
app.use('/auth', require('./src/routes/auth'))

app.listen(PORT, () => {console.log('Server Started!')})