const authRouter = require('express').Router()
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { JWT_TOKEN, REGISTER_TOKEN } = process.env

authRouter.post('/register', async (request, response) => {
    
    const registerToken = request.header('register-token')
    if (!registerToken || registerToken !== REGISTER_TOKEN) {
        return response.status(401).json({ error: 'register token missing or invalid' })
    }

    const isUsernameExist = await User.findOne({ name: request.body.name });
    if (isUsernameExist) {
        return response.status(400).json(
            {error: 'User already registered'}
        )
    }

    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        name: request.body.name,
        password: password
    });
    try {
        const savedUser = await user.save();
        response.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        response.status(400).json({error})
    }
})


authRouter.post('/login', async (request, response) => {
    
    const user = await User.findOne({ email: request.body.name });
    if (!user) return response.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword) return response.status(400).json({ error: 'Password not valid' })
    
    const token = jwt.sign({
        username: user.name,
        id: user._id
    }, JWT_TOKEN,
    {
      expiresIn: 60 * 60 * 24 * 7
    })
    
    response.json({
        username: user.name,
        token
    })
})

module.exports = authRouter;