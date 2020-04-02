const jwt = require('jsonwebtoken')

export const checkToken = (req, res, next) => {

  const token = req.headers['x-access-token'] || req.headers['authorization']

  if(req.path === '/authorization' || req.path === '/registration') {
    return next()
  }
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
