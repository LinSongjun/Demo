const express= require('express')
const passport = require('passport')
const Profile = require('../model/profile')

const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .then( profiles => {
            res.status(200).json(profiles)
        })
        .catch(err => console.log(err))
})

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
    const data = {}
    if (req.body.type) data.type = req.body.type
    if (req.body.describe) data.describe = req.body.describe
    if (req.body.income) data.income = req.body.income
    if (req.body.expenditure) data.expenditure = req.body.expenditure
    if (req.body.cash) data.cash = req.body.cash
    if (req.body.remark) data.remark = req.body.remark
    if (req.body.date) data.date = req.body.date

    new Profile(data).save().then( profile => {
        res.status(200).json(profile)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const data = {}
    if (req.body.type) data.type = req.body.type;
    if (req.body.describe) data.describe = req.body.describe;
    if (req.body.income) data.income = req.body.income;
    if (req.body.expenditure) data.expenditure = req.body.expenditure;
    if (req.body.cash) data.cash = req.body.cash;
    data.remark = req.body.remark;
    if (req.body.date) data.date = req.body.date;

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: data},
        {new: true}
    ).then( profile => {
        res.status(200).json(profile)
    })
})

router.delete('/del/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({_id: req.params.id})
        .then(profile => {
            res.status(200).json(profile)
        })
        .catch(err => console.log(err))
})

module.exports = router