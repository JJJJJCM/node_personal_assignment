const express = require('express');
const app = express();
const port = 4000;

const postsRouter = require('./routes/post.js')
const commentsRouter = require('./routes/comment.js')
const connect = require('./schemas')
connect()

app.use(express.json())
app.use('/api', [postsRouter, commentsRouter])

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

app.get('/', (req, res) => {
  res.send('메인페이지입니다.')
})