const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const { client } = require('./db/db')
const db = client.db('blogs')
const checkauth = require('./Auth/checkauth')
app.get('/', checkauth, async (_, res) => {
    let collection = await db.collection("blogs")
    let results = await collection.find({}).toArray()
    res.send(results).status(200);
})
app.get('/blog', (_, res) => {
    const blogs = [
        {
            title: "Post 1",
            post: "Chowing their 10 minutes break"
        },
        {
            title: "Post 2",
            post: "And I'm loving it!!!"
        }
    ]
    res.json({
        message: "<------ Posts ------>",
        blogs: blogs
    })
})

const now = new Date()
const current = now.toLocaleString()
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.post('/addblog',checkauth, async (req, res) => {
    try{
        const blogModel = {
            title: req.body.title,
            post: req.body.post,
            when: current
        }
        const collection = db.collection('blogs')
        const result = await collection.insertOne(blogModel)
        res.status(201).send(result)
    }catch(e){
        console.error('Failed to push a Blog', e)
        res.status(500).send('Internal Server Error')
    }
})
const { ObjectId } = require('mongodb')
app.delete('/removeblog/:id',checkauth, async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const collection = db.collection('blogs')
    let result = await collection.deleteOne(query)
    res.send(result).status(204)
})
app.patch('/update/:id',checkauth, async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)}
    const update = {
        $set: {
            title: req.body.title,
            post: req.body.post,
            when: current
        }
    }
    let collection = await db.collection('blogs')
    let result = await collection.updateOne(query, update)
    res.send(result).status(201)
})
const userRouter = require('./Auth/user')
app.use(userRouter)


module.exports = app
