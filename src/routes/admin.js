const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { password } = req.body;
  
  if (process.env.ADMIN_PASS !== password) {
    return res.status(400).send({ error: { message: '비밀번호가 틀렸습니다.' }});
  }
  
  try {
    const user = { 
      id: 1, 
      name: 'socratone', 
      account: 'admin' 
    };
  
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), // 1시간 * 24시간 * 7일
        data: JSON.stringify(user)
      }, 
      process.env.JWT_SECRET
    );
  
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: { message: error.message }});
  }
});

module.exports = router;