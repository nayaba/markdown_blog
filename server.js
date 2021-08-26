const express = require('express')
const app = express()
const mongoose = require('mongoose')

const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

console.log('Server is up and running!')

// set ejs
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index', { articles: articles }) // like props, passing articles to index.ejs
})

app.listen(5000)