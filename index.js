const express = require('express');
const cors = require('cors');
const app = express();
const { randomUUID } = require('crypto')

const USERS = []
const POSTS = []
for(let i = 0; i<17; i++){
  USERS.push({
    userId: `userId${i}`,
    username: `generateduser${i}`,
    realname: `real name${i}`,
    description: `from finland like bikes`,
    avatar: `dummyavatarurl`,
  })
}
for(let i = 0; i<17; i++){
  POSTS.push({
    postId: randomUUID(), 
    userId: USERS[i].userId, 
    author: USERS[i].username,
    timestamp: Date.now(), 
    imgurl:`dummyimgurl${i}`, 
    likes: i, 
    title: "kaupungil testaas testikuval",
    tags: ["kaupungil", "hengaas", "testtag"],
    comments: [{
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username,
      comment: "test 1",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 2",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 3",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 4",
      timestamp: Date.now()
    }
  ]})
}
for(let i = 0; i<17; i++){
  POSTS.push({
    postId: randomUUID(), 
    userId: "userId1", 
    author: USERS[i].username,
    timestamp: Date.now(), 
    imgurl:`dummyimgurl${i}`, 
    likes: i, 
    title: "kaupungil testaas testikuval",
    tags: ["kaupungil", "hengaas", "testtag"],
    comments: [{
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username,
      comment: "test 1",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 2",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 3",
      timestamp: Date.now()
    },
    {
      userId: USERS[i].userId,
      commentId: `commentid${i}`,
      username: USERS[i].username, 
      comment: "test 4",
      timestamp: Date.now()
    }
  ]})
}
app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use(express.json())


app.get('/igposts/', paginatedResults(POSTS), (req, res) => {
  res.json({posts: res.paginatedResults, page: res.page, totalPages: res.totalPages})
})


app.get('/users/:userid', (req, res) => {
  res.json(USERS.find(u => u.userId === req.params.userid))
})

app.get('/igposts/:userid', paginatedResultsByUID(POSTS), (req, res) => {
  res.json({posts: res.paginatedResults, page: res.page, totalPages: res.totalPages})
})

function paginatedResultsByUID(model){
  return (req, res, next) => {
    const filteredModel = model.filter(post => post.userId === req.params.userid)
    const page = parseInt(req.query.page)
    const limit = 12

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const totalPages = Math.ceil(filteredModel.length / limit)

    const results = filteredModel.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.page = page
    res.totalPages = totalPages
    next()
  }
}

function paginatedResults(model){
  return (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = 5

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const totalPages = Math.ceil(POSTS.length / limit)

    const results = model.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.page = page
    res.totalPages = totalPages
    next()
  }
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});