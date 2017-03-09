import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const authenticate = (req, res) => {
    User.findOne({username: req.body.username})
        .exec()
        .then(user => {
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' })
            }
            else {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. User not found.' })
                }
                else {
                    let token = jwt.sign(user, app.get('app_secret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    })
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    })
                }
            }
        })
}