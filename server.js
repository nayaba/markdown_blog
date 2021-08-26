const express = require('express')
const app = express()

const articleRouter = require('./routes/articles')

console.log('Server is up and running!')

// set ejs
app.set('view engine', 'ejs')


app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }, {
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index', { articles: articles }) // like props, passing articles to index.ejs
})

app.listen(5000)