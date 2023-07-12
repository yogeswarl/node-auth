const jwt = require('jsonwebtoken');
const { TOKEN_KEY  } = process.env

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(403).send('A token is required for authentication');
  console.log(token)
  try {
    const decoded = await jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  }
  catch(err){
    return res.status(401).send('Invalid Token');
  }
  return next();
}

module.exports = verifyToken;

