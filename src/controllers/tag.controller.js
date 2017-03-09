import Tag from '../models/tag.model'
import { testTag } from '../seed_data'

const debug = require('debug')('api:controllers:tag.controller')

export const list = (req, res, next) => {
    debug("list called")
    Tag.list()
        .then(tags => {
            res.range({length: tags.length})
            res.json(tags)
        })
        .catch(e => next(e))
}

export const getById = (req, res, next) => {
    debug("getById called")
    Tag.getById(req.params.tagId)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}

export const seedTag = () => {
    Tag.findOne({name: "test"}).exec()
        .then(tag => {
            if (!tag) {
                debug("seeding Tag")
                Tag.create({...testTag})
            }
        })
}