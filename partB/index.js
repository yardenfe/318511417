const express=require ('express');
const app= express();
const path=require ('path');
const BodyParser =require ('body-parser');
const sql= require ('./db/db');
const CRUD = require ('./db/CRUD');
const port=9009;
// const dbConfig = require("./db/db.config.js");

// app.set('views', path.join (__dirname, 'views'));
// app.set('view engine','pug');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"static")));

// app.get('/Login', (req,res)=>{
//     res.render('login', {
//         v1: "this is an example for a PUG rendering",
//         v2: "it is a way to pass variables into a dynamic webpage"
//     });
// });

app.post('/insertUserIntoDB',CRUD.insertNewSignIn)

app.get('/',(req,res)=> {
    res.redirect("/home")
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about_us.pug'))
})
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'))
})
app.get('/about_us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about_us.html'))
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contact.html'))
})
app.get('/FindGuide', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/find_guide.html'))
})
app.get('/FindTrip', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/find_your_trip.html'))
})
app.get('/Favorite', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/My_favorite.html'))
})
app.get('/Recommended', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/Recommended.html'))
})
app.get('/RegisterGuide', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register_guide.html'))
})
app.get('/RequestTrip', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/request_trip.html'))
})
app.get('/Review', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/review.html'))
})
app.get('/SignUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/signup.html'))
})
app.get('/Trips', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/your_trips.html'))
})

app.listen(port, () => {
console.log('Example app listening at http://localhost9009')
})