import Tag from './models/tag.model'
import Article from './models/article.model'
import User from './models/user.model'
import Promise from 'bluebird'

const debug = require('debug')('api:seed_data')

const testArticle = {
    slug: "maintenance",
    title: "Maintenance",
    summary: "The site is currently under maintenance. Please check back soon.",
    imageUrl: "",
    createdDate: Date.now(),
    markdown: "### Maintenance \nPlease check back soon!"
}

const testTag = {
    name: "maintenance"
}

const adminUser = {
    username: 'admin',
    password: process.env.ADMIN_PASSWORD,
    admin: true
}

const seedTag = () => {
    return Tag.list().then(tags => {
        if (tags.length === 0) {
            debug('seeding tag')
            return Tag.create({...testTag})
                .then(tag => tag._id)
        }
        else {
            return Promise.resolve(tags[0]._id)
        }
    }).catch(err => debug(`error seeding tag ${err}`))
}

const seedArticle = (tagId) => {
    Article.list().then(articles => {
        if (articles.length === 0) {
            debug('seeding article')
            return Article.create({
                ...testArticle,
                tags: [tagId]    
            })
        }
    }).catch(err => debug(`error seeding article: ${err}`))
}

const seedAdmin = () => {
    User.getAdmin()
        .then(user => {
            if (!user) {
                debug('seeding admin user')
                User.create({ ...adminUser })
            }
            else {
                debug('admin user already exists')
            }
        }).catch(err => `error seeding admin ${err}`)
}

export default () => {
    seedTag().then(tagId => {
        seedArticle(tagId)
    })
    seedAdmin()
}