//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//----------------------mongoDB connectivity---------------//
//step -1 install mongoose
//step -2 const mongoose = require('mongoose');
//step -3 connect
mongoose.connect("mongodb+srv://pushpakjangela02:crEKcU97UlBC2y3R@cluster0.qnkbkjn.mongodb.net/blogDB",{useNewUrlParser:true});

//step -4 schema

const postschema = {
  title : String,
  content : String
};
//step -5 creating the mongoose model basesd onn these schema


const Post = mongoose.model("Post",postschema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
  res.render("home",{
    startingContent:homeStartingContent,
    posts:posts
  });
  });
});
//----------------get ------------------------------------------------//
//we have to use this render for ejs because its on sever

/*app.get("/post",function(req,res){
  res.render("post",{
    user:homeStartingContent,
    postre:posts
  });
});*/



app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post ({
    title : req.body.postTile,
    content : req.body.postbody
  });
  //stores.push(post);
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId},function(err,post){
    res.render("post",{
      title:post.title,
      content:post.content
    });
  });


});




//showing the data to the html


//renser the about page:-
app.get("/about",function(req,res){
  res.render("about",{userA:aboutContent});
});

//--------------------get function for compose----------------------------//



/*<a href="/posts/<%= posts._id %>">Read more </a>*/

/*--------------------------post request(button click ke baad ka suffer)
1 when you press the buttomm then you target the compose page
2 then console.log return the value to the server
3 so you have to check what calue user enter into the input form
4 so ypu have get the value by res.body.pub
//----------------------------------*/





//render the contact page:-
app.get("/contact",function(req,res){
  res.render("contact",{userF:contactContent});
})

/*app.get("/posts/:testing",function(req,res){

  const requestTitle = _.lowerCase(req.params.testing);

  posts.forEach(function(post){
    const storeTitle = _.lowerCase(post.title);

    if(requestTitle===storeTitle){
      res.render("post",{
        title: post.title,
        content: post.textarea
      });
    }
  });
});
*/
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
