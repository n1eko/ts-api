const jwt = require('jsonwebtoken')

const verifyToken = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ''
  
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    if (token == '') return response.status(401).json({ error: 'token missing or invalid' })
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN)
        request.user = verified
        next()
    } catch (error) {
        response.status(400).json({error: 'token missing or invalid'})
    }
}

module.exports = verifyToken;