const express = require("express");
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const path = require('path');
const app = express();
app.use(express.static(__dirname + "/public"));

//Nhúng bodyParser vào app
app.use(bodyParser.urlencoded({ extended: true }))

//Đọc file ejs
app.set("view engine", "ejs")

app.get("/", function (req, res) {
    res.render("index.ejs")
})

//Chạy localhost cổng 3000
app.listen(3000, function () {
    console.log("Hello nodejs running on port 3000")
})

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        return console.log(err)
    }
    db = client.db("todo")
    console.log("Đã kết nối tới Database")
})

//////////////////////////////////////////////////////////////////////////
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


//code xử lý việc lấy dữ liệu từ mongoDB đổ vào nodejs app
app.get("/todo", function (req, res) {
    let tourList = db.collection("website").find().toArray().then(results => {
        console.log(results)
        res.render("index.ejs", { result: results })
    }).catch(error => {
        console.error(error)
    })
    //console.log(__dirname)
    //res.render("index.ejs", {result : quotes})
})

// app.get('/todo/:todoId', function (req, res) {
//     let id = req.params['todoId'];
//     let objectId = require('mongodb').ObjectID
//     db.collection("website").findOne({ _id: new objectId(id) }).then(results => {
//         console.log(results)
//         res.render("index.ejs", { todo: results })
//     }).catch(error => {
//         console.error(error)
//     })
// });

app.get("/", function (req, res) {
    // console.log(__dirname)
    // res.sendFile(__dirname + "/index.html")
    res.render("index.ejs", { result: results })
})

app.post("/add-tour", function (req, res) {
    db.collection("website").insertOne(req.body).then(results => {
        console.log(results)
    }).catch(error => {
        console.error(error)
    })
})
    // console.log("Đã nhận request", req.body)
    // let newTodo = req.body;
    // push(newTodo);



app.post("/update-tour", function (req, res) {
    db.collection("website").updateOne({ title: req.body.title }, { $set: { title: req.body.newtitle } }).then(results => {
        console.log(results);
    }).catch(error => {
        console.error(error)
    })
})
    // console.log("Đã nhận request", req.body)
    // for (var i = 0; i < tourList.length; i++) {
    //     if (tourList[i].title === req.body.title) {
    //         tourList[i].title = req.body.newtitle
    //     }
    // }


app.post("/delete-tour", function (req, res) {
    db.collection("website").deleteOne({ title: req.body.title }).then(results => {
        console.log(results)
    }).catch(error => {
        console.error(error)
    })
})
    // console.log("Đã nhận request", req.body)
    // for (var i = 0; i < tourList.length; i++) {
    //     if (tourList[i].title === req.body.title) {
    //         tourList.splice(i, 1);
    //     }
    // }


