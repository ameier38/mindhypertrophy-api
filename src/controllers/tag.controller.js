import Tag from '../models/tag.model'

const debug = require('debug')('api:controllers:tag.controller')

export const listTags = (req, res, next) => {
    debug("listTags called")
    Tag.list()
        .then(tags => {
            res.range({length: tags.length})
            res.json(tags)
        })
        .catch(e => next(e))
}

export const getTag = (req, res, next) => {
    debug("getTag called")
    Tag.getById(req.params.tagId)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}

export const createTag = (req, res, next) => {
    debug('createTag called')
    Tag.create(req.body)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}

export const updateTag = (req, res, next) => {
    debug('updateTag called')
    Tag.update(req.params.tagId, req.body)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}

export const deleteTag = (req, res, next) => {
    debug('deleteTag called')
    Tag.delete(req.params.tagId)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}
