const express = require('express');
const cors = require('cors');
const app = express();

const POSTS = []
for(let i = 0; i<17; i++){
  POSTS.push({
    id: i, 
    userId: `userid${i}`, 
    author: `GeneratedUser${i}`, 
    timestamp: Date.now(), 
    imgurl:`dummyimgurl${i}`, 
    likes: i, 
    title: "kaupungil testaas testikuval",
    tags: ["kaupungil", "hengaas", "testtag"],
    comments: [{
      userId: `userid${i}`,
      commentId: i,
      user: `user${i}`, 
      comment: "test 1",
      timestamp: Date.now()
    },
    {
      userId: `userid${i+1}`,
      commentId: `commentid${i}`,
      user: `user${i}`, 
      comment: "test 2",
      timestamp: Date.now()
    },
    {
      userId: `userid${i+2}`,
      commentId: `commentid${i}`,
      user: `user${i}`, 
      comment: "test 3",
      timestamp: Date.now()
    },
    {
      userId: `userid${i+3}`,
      commentId: `commentid${i}`,
      user: `user${i}`, 
      comment: "test 4",
      timestamp: Date.now()
    }
  ]})
}

app.use(cors({origin: "http://localhost:3000", credentials:true}));
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello, World!');
})

app.get('/igposts/', paginatedResults(POSTS), (req, res) => {
  res.json({posts: res.paginatedResults, page: res.page, totalPages: res.totalPages})
})

app.get('/igposts/:postid', (req, res) => {

  res.send(POSTS.get(req.params.postid))
})

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