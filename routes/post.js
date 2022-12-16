const express = require('express')
const router = express.Router()

const Posts = require('../schemas/post.js')

// 게시물 작성
router.post('/posts', async (req, res) => {
  const {user, password, title, content} = req.body

  try {
    const createPosts = await Posts.create({user, password, title, content})
    if(createPosts) {
      return res.status(200).json({message : "게시글을 생성하였습니다."})
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }
})

// 전체 게시물 조회
router.get('/posts', async (req, res) => {
  try {
    const posts = await Posts.find({}, {user : 1, title : 1, time : 1}).sort({time: -1})
    // console.log(posts)
    return res.status(200).json({data : posts})
  } catch (err) {
    return res.status(500).json({error: err})
  }
})

// 게시물 상세 조회
router.get('/posts/:_id' , async (req, res) => {
  const {_id} = req.params

  try {
    const posts = await Posts.findById(_id, {user : 1, title : 1, time : 1, content : 1})
    if(posts) {
      return res.status(200).json({data : posts})
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }
})

// 게시물 수정
router.put('/posts/:_id', async (req, res) => {
  const {_id} = req.params
  const {password, content} = req.body

  try {
    const posts = await Posts.findById(_id)
    // console.log(posts, '이거 입니다')
    if(posts.password === password) {
      await Posts.updateOne(
        {_id : _id},
        {$set : {content : content}}
      )
      return res.status(200).json({message : '게시글을 수정하였습니다.'})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({error: err})
  }
})

// 게시글 삭제
router.delete('/posts/:_id', async (req, res) => {
  const {_id} = req.params
  const {password} = req.body

  try {
    const posts = await Posts.findById(_id)
    if(posts.password === password) {
      await Posts.deleteOne({_id : _id})
      return res.status(200).json({message : '게시글을 삭제하였습니다.'})
    }
  } catch (err) {
    return res.status(500).json({error: err})
  }
})


module.exports = router