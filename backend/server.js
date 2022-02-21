const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const mongoString =
  'mongodb+srv://admin:admin@cluster0.tl4ba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(mongoString, {
  useUnifiedTopology: true
})
  .then((client) => {
    const db = client.db('myFirstDatabase')
    const news = db.collection('news')
    const users = db.collection('users')

    app.use(cors())
    app.options('*', cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.listen(3000)

    app.get('/', (req, res) => {
      news
        .find()
        .toArray()
        .then((results) => {
          res.send(results)
        })
        .catch((error) => console.error(error))
    })

    app.post('/create', async (req, res) => {
      const authorName = await users
        .findOne({
          _id: new ObjectId(req.body.authorId)
        })
        .then((user) => user.login)
        .catch((error) => console.error(error))

      news
        .insertOne({
          heading: req.body.heading,
          text: req.body.text,
          authorId: req.body.authorId,
          authorName: authorName
        }).then(() => {
          res.redirect('http://localhost:8080/?userId=' + req.body.authorId)
        })
        .catch((error) => console.error(error))
    })

    app.put('/edit', (req, res) => {
      news
        .findOneAndUpdate(
          { _id: new ObjectId(req.body.postId) },
          {
            $set: {
              heading: req.body.heading,
              text: req.body.text
            }
          }
        )
        .catch((error) => console.error(error))
    })

    app.post('/reg', (req, res) => {
      users
        .insertOne(req.body)
        .then(() => {
          res.redirect('http://localhost:8080/auth.html')
        })
        .catch((error) => console.error(error))
    })

    app.post('/auth', (req, res) => {
      users
        .findOne({
          login: req.body.login,
          password: req.body.password
        })
        .then((user) => {
          res.redirect('http://localhost:8080/?userId=' + user._id)
        })
        .catch((error) => console.error(error))
    })
  })
  .catch(console.error)
