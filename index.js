const express= require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('../node-app/config/keys')
const userRouter = require('../node-app/routes/userRouter')
const profileRouter = require('../node-app/routes/profileRouter')

mongoose.connect(keys.mongodbPath, { useUnifiedTopology: true })

const app = express()

/*app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
})*/

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//配置passport
app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('server is running...')
})