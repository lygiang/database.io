const express = require("express");
const bodyParser = require("body-parser")
const path = require('path');
const mysql = require('mysql');
const app = express();
app.use(express.static(__dirname + "/public"));

//Nhúng bodyParser vào app
app.use(bodyParser.urlencoded({ extended: true }))

//Đọc file ejs
app.set("view engine", "ejs")

app.get("/", function (req, res) {
    res.render("index.ejs")
})

//connect mySQL
console.log('Get connection ...');

let con = mysql.createConnection({
    database: 'world',
    host: "localhost",
    port: 3308,
    user: "root",
    password: "123123"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


//Chạy localhost cổng 3000
app.listen(3000, function () {
    console.log("Hello nodejs running on port 3000")
})


//////////////////////////////////////////////////////////////////////////
// let tourList = [{
//     link: "./detail_sapa.html",
//     img: "https://img.thuthuatphanmem.vn/uploads/2018/09/26/anh-dep-mot-goc-thi-xa-sa-pa-xe-chieu_052040737.jpg",
//     title: "Tour Sapa 3N2D",
//     price: "2.199.000 VND"
// },
// {
//     link: "./detail_halong.html",
//     img: "https://dulichhalongquangninh.com/wp-content/uploads/2016/07/hinh-anh-du-lich-ha-long8.jpg",
//     title: "Tour Hạ Long 2N1D",
//     price: "1.750.000 VND"
// },
// {
//     link: "./detail_danang.html",
//     img: "https://divui.com/blog/wp-content/uploads/2018/10/111111.jpg",
//     title: "Tour Đà Nẵng 3N2D",
//     price: "2.899.000 VND"
// }
// ]


// //code xử lý việc lấy dữ liệu từ mongoDB đổ vào nodejs app
// app.get("/todo", function (req, res) {
//     let tourList = db.collection("website").find().toArray().then(results => {
//         console.log(results)
//         res.render("index.ejs", { result: results })
//     }).catch(error => {
//         console.error(error)
//     })
//console.log(__dirname)
//res.render("index.ejs", {result : quotes})
// })

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

app.get("/home", function (req, res) {
    console.log("Day la trang chu")
    con.query("SELECT * FROM tourist", function (err, tourist) {//Phần này chắc cần chú ý đến cái "tên_database.tên_table" để truy cập vào database
        //console.log("123456", tourist)
        // res.sendFile(__dirname + "/index.html")
        res.render("index.ejs", { result: tourist } )
    })
})

app.post("/add-tour", function (req, res) {
    console.log("Đã nhận req add post", req.body)
    con.query(`INSERT INTO world.tourist(link, img, title, price) VALUES('${req.body.link}', '${req.body.img}', '${req.body.title}', '${req.body.price}')`, function (err, result) {
        if (err) throw err;
    })
})
// // console.log("Đã nhận request", req.body)
// // let newTodo = req.body;
// // push(newTodo);

app.post("/update-tour", function (req, res) {
    console.log("Đã nhận req update post", req.body)
    con.query(`UPDATE world.tourist SET title = '${req.body.newtitle}' WHERE title = '${req.body.title}'`, function (err, result) {
        if (err) throw err;})
})
// console.log("Đã nhận request", req.body)
// for (var i = 0; i < tourList.length; i++) {
//     if (tourList[i].title === req.body.title) {
//         tourList[i].title = req.body.newtitle
//     }
// }


app.post("/delete-tour", function (req, res) {
    console.log("Đã nhận req delete post", req.body)
    con.query(`DELETE FROM world.tourist WHERE title = '${req.body.title}'`, function (err, result) {
        if (err) throw err;
})
})
    // console.log("Đã nhận request", req.body)
    // for (var i = 0; i < tourList.length; i++) {
    //     if (tourList[i].title === req.body.title) {
    //         tourList.splice(i, 1);
    //     }
    // }


