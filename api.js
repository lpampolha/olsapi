const express = require('express')
//const routeUsers = require('./src/routes/users')
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
// app.use('/', routeUsers)
// app.use('/register', require('./src/routes/register'))
// app.use('/list', require('./src/routes/list'))
// app.use('/edit', require('./src/routes/edit'))
// app.use('/delete', require('./src/routes/delete'))
// app.use('/auth', require('./src/routes/auth'))
// app.use('/exercises', require('./src/routes/exercises'))

app.listen(PORT, () => {console.log('Server Started!')})