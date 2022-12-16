const express = require('express')
const { updateOne } = require('../schemas/comment.js')
const router = express.Router()

const Comments = require('../schemas/comment.js')
const Posts = require('../schemas/post.js')


// 댓글 작성
router.post('/comments/:_id', async (req, res) => {
  const {_id} = req.params  // post_id
  const {user, password, content} = req.body

  try {
    const posts = await Posts.findById(_id)
    if(posts) {
      if(!user || !password || !content ) {
        return res.status(400).json({message : '댓글 내용을 입력해주세요'})
      } else {
        await Comments.create({user, password, content, posts})
        return res.status(200).json({massage : '댓글을 생성하셨습니다.'})
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err})
  }
})

// 댓글 목록 조회
router.get('/comments/:_id', async (req, res) => {
  const {_id : postId} = req.params // postId , _id 이름 바꾸기 => postId

  try {
    const post = await Posts.findById(postId)
    if(post) {
      const comments = await Comments.find({posts : postId}).sort({time: -1}) // postId에 해당한 comments 데이터만 추출
      const newPost = post.toObject() //  1. mongoose에서 반환 된 객체는 자바스크립트의 객체가 아니다.
                                      //  2. toObject() 함수를 사용하여, key, value값을 객체에 할당시켜준다,
                                      //  3. 할당시킨 값을 새로운 변수에 삽입한다.
      newPost['comments'] = comments  //  post는 객체 안에 key값 value값 삽입

      return res.status(200).json({data : newPost}) // post 객체를 불러옴
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }
})

// 댓글 수정
router.put('/comments/:_id', async (req, res) => {
  const {_id : commentId} = req.params
  const {password, content} = req.body

  try {
    const comments = await Comments.findById(commentId)
    if(comments) {
      if(!password || !content) {
        return res.status(400).json({message : '댓글 내용을 입력해주세요'})
      } else if(comments.password === password) {
        await Comments.updateOne(
          {_id : commentId},
          {$set : {content : content}}
        )
        return res.status(200).json({message : '댓글을 수정하였습니다.'})
      } else {
        return res.status(400).json({message: '비밀번호가 틀렸습니다.'})
      }
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }
})

// 댓글 삭제
router.delete('/comments/:_id', async (req, res) => {
  const {_id : commentId} = req.params
  const {password} = req.body

  try {
    const comments = await Comments.findById(commentId)
    if(comments) {
      if(!password || comments.password != password) {
        return res.status(400).json({message : '비밀번호가 잘못 입력되었습니다.'})
      } else {
        await Comments.deleteOne({_id : commentId})
        return res.status(200).json({message : '댓글을 삭제하였습니다.'})
      }
    }
  } catch (err) {

  }
})






module.exports = router