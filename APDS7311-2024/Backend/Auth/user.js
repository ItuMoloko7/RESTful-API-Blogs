const express = require('express')
const app = express()
const { client } = require('../db/db')
const db = client.db('blogs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore()
const brute = new ExpressBrute(store)
app.post('/signup',  async (req, res) => {
    try{
        const hashedpassword = await bcrypt.hash(req.body.password, 10)
    let userModel = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedpassword
    }
        let collection = await db.collection('users')
        await collection.insertOne(userModel)
        res.status(201).send(`Welcome ${userModel.name} ${userModel.surname}`)
        console.log(hashedpassword)
    }catch(err){
        console.error(err)
    }
})

app.post('/login', brute.prevent, async (req, res) => {
    const { email, password } = req.body
    try {
        let collection = await db.collection('users')
        let user = await collection.findOne({ email: email })
        if (!user) {
            return res.status(401).send({message: 'Check your email or password'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).send({message: 'Check your email or password'})
        }else{
            const token = jwt.sign({ email: user.email }, 'Thisthestringwewilluseforourtoken.ThelongerthestringMorecomplicatedthetokenwillbe', { expiresIn: '1h'})
            return res.status(200).json({message: 'Welcome dude.', token: token})
        }
    }catch(err){
        console.error(err)
        res.status(401).json({message: 'Failed Login Attempt'})
    }
})
module.exports = app