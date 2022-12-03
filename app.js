//jshint esversion:6
/*global console,$,document  */
/*eslint-disable no-console*/

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

/*---------------------expended cards------------*/





const homeStartingContent = "Hey guy's this website is the for blog web site.Here you can post your Everyday's blog.You know that,Everyday has many story and Everyday has it's own memory.Here you can post your story so don't be shy for sharing thing's.";
const aboutContent = "So we are college student's and we create this wonderful blog website, mostly for the introvert type people.But also anyone come here share their thought...,so you know each day contain many memory good and bad memory in everybody life's and some of them want's to share that but,Due to their inner fear ,if he/she share their thought then people not make their laugh's.So here you can share thought without any fear and the will not forced to share their name or any id, This generally a social website to connect the people thought's.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//----------------------mongoDB connectivity---------------//
//step -1 install mongoose
//step -2 const mongoose = require('mongoose');
//step -3 connect
mongoose.connect("mongodb+srv://jangela_pushpak:Y004U1EOUOMRhgT5@cluster0.qnkbkjn.mongodb.net/blogDB",{useNewUrlParser: true});
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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});

//https://git.heroku.com/peaceful-beach-87121.git
//https://peaceful-beach-87121.herokuapp.com/
