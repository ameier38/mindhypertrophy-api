import Article from '../models/article.model'

const debug = require('debug')('api:controllers:article.controller')

export const listArticles = (req, res, next) => {
    debug("listArticles called")
    Article.list()
        .then(articles => {
            res.range({length: articles.length})
            res.json(articles)
        })
        .catch(e => next(e))
}

export const getArticle = (req, res, next) => {
    debug('getArticle called')
    Article.getById(req.params.articleId)
        .then(article => res.json(article))
        .catch(e => next(e))
}

export const getArticleBySlug = (req, res, next) => {
    debug('getArticleBySlug called')
    Article.findOne({slug: req.params.slug})
        .then(article => res.json(article))
        .catch(e => next(e))
}

export const createArticle = (req, res, next) => {
    debug('createArticle called')
    const { 
        slug, title, summary, imageUrl, 
        createdDate, markdown, tagNames 
    } = req.body
    const newArticle = {
        slug, title, summary, imageUrl, 
        createdDate, markdown, tagNames 
    }
    Article.addNew(newArticle)
        .then(article => res.json(article))
        .catch(e => next(e))
}

export const updateArticle = (req, res, next) => {
    debug('updateArticle called')
    const { 
        slug, title, summary, imageUrl, 
        createdDate, markdown, tagNames 
    } = req.body
    const updatedArticle = {
        slug, title, summary, imageUrl, 
        createdDate, markdown, tagNames 
    }
    Article.update(req.params.articleId, updatedArticle)
        .then(article => res.json(article))
        .catch(e => next(e))
}

export const deleteArticle = (req, res, next) => {
    debug('deleteArticle called')
    Article.delete(req.params.articleId)
        .then(article => res.json(article))
        .catch(e => next(e))
}
