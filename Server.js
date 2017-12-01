var express= require("express");
var app=express();
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID
var db=null;
var bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));

MongoClient.connect("mongodb://10.201.47.68:27017/meeting",function(err,database){
   // console.log(err);
    db = database;
   // console.log(db);
});

app.get("/list",function (req,res) {
    console.log(db);
    db.collection("meet").find({}).toArray(function(err,doc){
        console.log(err);
        res.json(doc);
    })
})

app.post("/list",function(req,res){
    console.log(req.body);
    db.collection("meet").insertOne(req.body,function(err,doc){
        res.json(doc);
    })
})

app.delete("/list/:id",function(req,res){
    console.log(req.params.id+"fdfsffsd");
    var id=req.params.id;
    var myquery={_id: ObjectId(id)};
    db.collection("meet").deleteOne(myquery, function(err, doc) {
        res.json(doc);
    });

})

app.get("/list/:id",function (req,res) {
    console.log(req.params.id);
    var id=req.params.id;
    db.collection("meet").findOne({_id: ObjectId(id)},function(err, doc) {
           console.log(err);
           res.json(doc);
    })

});
app.put("/list/:id",function (req,res) {
    console.log(req.body.name);
    var id=req.params.id;
    var myquery={_id:ObjectId(id)};
    var newvalues={name:req.body.name,date:req.body.date,place:req.body.place,des:req.body.des};
    db.collection("meet").updateOne(myquery,newvalues,function (err,doc) {
        console.log(err);
        res.json(doc);
    })
})

app.listen(3000);
console.log("Server working on port 3000")