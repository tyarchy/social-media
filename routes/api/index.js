const router = require('express').Router();
const userroutes = require('./user-routes')
const thoughtroutes = require('./thoughts-routes')

router.use('/users', userroutes)
router.use('/thoughts', thoughtroutes)

module.exports = router