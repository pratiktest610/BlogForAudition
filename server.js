const data = require(__dirname + "/data.js")
let posts = data.posts()

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("index", {posts: posts})
})

app.get("/post/:index", function(req, res){
    res.render("post", {post: posts[req.params.index], posts: posts})
})

app.get("/aboutme", function(req, res){
    res.render("aboutme")
})

app.get("/addPost", function(req, res){
    res.render("addPost")
})

app.post("/addPost", function(req, res){
    let heading = req.body.heading
    let subheading = req.body.subheading
    let matter = req.body.matter
    let no = posts.length
    let post = {
        no: no,
        heading: heading,
        subheading: subheading,
        matter : matter,
    }
    posts.push(post)
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("server is running at port 3000")
})