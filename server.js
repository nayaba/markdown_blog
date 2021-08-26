const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Article = require('./models/article')

const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

console.log('Server is up and running!')

// set ejs
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false })) // unhandled promise cannot read property 'title' of undefined if the urlencoder is *after* app.use

app.get('/', (req, res) => {
    const articles = Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles }) // like props, passing articles to index.ejs
})

app.use('/articles', articleRouter)

app.listen(5000)