const express = require("express");
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const path = require('path');
const app = express();
app.use(express.static(__dirname + "/public"));

MongoClient.connect("mongodb://localhost:27017",(err,client) => {
    if (err) {
        return console.log(err)
    }
    db = client.db("todo")
    console.log("Đã kết nối tới Database")
})

let tourList = [{
    link: "./detail_sapa.html",
    img: "https://img.thuthuatphanmem.vn/uploads/2018/09/26/anh-dep-mot-goc-thi-xa-sa-pa-xe-chieu_052040737.jpg",
    title: "Tour Sapa 3N2D",
    price: "2.199.000 VND"
},
{
    link: "./detail_halong.html",
    img: "https://dulichhalongquangninh.com/wp-content/uploads/2016/07/hinh-anh-du-lich-ha-long8.jpg",
    title: "Tour Hạ Long 2N1D",
    price: "1.750.000 VND"
},
{
    link: "./detail_danang.html",
    img: "https://divui.com/blog/wp-content/uploads/2018/10/111111.jpg",
    title: "Tour Đà Nẵng 3N2D",
    price: "2.899.000 VND"
}
]

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")

// app.get("/", function(req, res){
//     res.render("index.ejs")
// })

// app.get("/about", function(req, res){
//     res.send("<h1>This is the about function</h1>")
// })

app.get("/", function(req, res) {
    // console.log(__dirname)
    // res.sendFile(__dirname + "/index.html")
    res.render("index.ejs", { result: tourList})
})

app.post("/new-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    let newTodo = req.body;
    tourList.push(newTodo);
})


app.post("/fix-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    for (var i = 0; i < tourList.length; i++) {
        if (tourList[i].title === req.body.title) {
            tourList[i].title = req.body.newtitle
        }        
    }
})

app.post("/delete-todo", function(req, res) {
    console.log("Đã nhận request", req.body)
    for (var i = 0; i < tourList.length; i++) {
        if (tourList[i].title === req.body.title) {
            tourList.splice(i, 1);
        }
    }
})


app.listen(3000, function() {
    console.log("Hello nodejs running on port 3000")
})