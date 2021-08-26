const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

console.log('Server is up and running!')

// set ejs
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // unhandled promise cannot read property 'title' of undefined if the urlencoder is *after* app.use
app.use(methodOverride('_method'))
app.get('/', async (req, res) => {
    try {
        console.log('index request: ', req.body)
        const articles = await Article.find().sort({
          createdAt: 'desc'
        })
        return res.render('articles/index', { articles: articles })
      } catch (error) {
        return res.status(500).send(error.message)
      }
})

app.use('/articles', articleRouter)

app.listen(5000)