const express = require('express')
const md5 = require('blueimp-md5')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const User = require('../model/user')
const keys = require('../config/keys')

const router = express.Router()

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then( user => {
            if (user) {
                return res.json({message: '该邮箱已被注册'})
            }
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
            const newUser = {
                email: req.body.email,
                name: req.body.name,
                password: md5(md5(req.body.password)),
                avatar: avatar,
                identity: req.body.identity
            }
            new User(newUser).save().then( user => {
                return res.status(200).json({
                message: 'success',
                user: user
            })
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password))
    })
        .then( user => {
            if (user) {
                // 登录成功生成token
                // jwt.sign("内容规则","加密名字","过期时间","箭头函数")
                const rule = {id: user.id, email: user.email, avatar: user.avatar, identity: user.identity, name: user.name}
                jwt.sign(rule, keys.secret, {expiresIn: '1h'}, (err, token) => {
                    if (err) {
                        return res.json(err)
                    }
                    return res.status(200).json({
                        message: 'success',
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.json({message: '账号或密码错误'})
            }
        })
})

router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        identity: req.user.identity
    })
})

module.exports = router