const { Router } = require('express')
const { userControllers } = require('./user.controllers')
// const { protect } = require('../../middelware/authUser')

const userRouter = Router()
userRouter.post('/signup', userControllers.userRegistration)
userRouter.post('/login', userControllers.login)
userRouter.get('/:userName', async (req, res) => { })
userRouter.put('/:userName', async (req, res) => { })

module.exports = { userRouter }
