const express = require('express');
const app = express();
const path = require('path');
const BodyParser = require('body-parser');
const sql = require('./db/db');
const CRUD = require('./db/CRUD');
const port = 8080;
const CreateDB = require('./db/CreateDB');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'pug');

app.get('/', (req, res) => {
    res.redirect("/home")
})

app.get('/home', (req, res) => {
    res.cookie('username',"");
    console.log("the user name is"+req.cookies.username)
    res.render("login.pug");
});
app.get('/about_us', (req, res) => {
    res.render("about_us.pug");
});
app.get('/contact', (req, res) => {
    res.render("contact.pug");
});

app.get('/find_your_trip', (req, res) => {
    if(req.cookies.username==""){
        res.render("login.pug");
    }
    res.render("find_your_trip.pug");
});

app.get('/Recommended', (req, res) => {
    if(req.cookies.username==""){
        res.render("login.pug");
    }
    res.render("Recommended.pug");
});
app.get('/updateDetails', (req, res) => {
    if(req.cookies.username==""){
        res.render("login.pug");
    }
    res.render("updateDetails.pug");
});

app.get('/sign_up', (req, res) => {
    res.render("signup.pug");
});

app.get('/your_trips', (req, res) => {
    res.render("your_trips.pug");
});

app.get('/register_guide', (req, res) => {
    res.render("register_guide.pug");
});

app.get('/review/:tripName', (req, res) => {
    //const nameOfTrip=req.params.tripName;
    res.render(path.join(__dirname,'views/review'))
});

app.get('/find_guide', CRUD.getGuides);
app.post('/CheckLogin', CRUD.CheckLogin);
app.post('/insertUserIntoDB', CRUD.insertNewSignIn);
app.get('/CreateTable', [CreateDB.CreateTable, CreateDB.CreateTabletrip, CreateDB.CreateTableFaorite, CreateDB.CreateTableguide, CreateDB.CreateTablereview]);
app.get('/DropTable', [CreateDB.Dropreview,CreateDB.Dropfavorite, CreateDB.Dropguide, CreateDB.Droptrip, CreateDB.Dropusers]);
app.get('/InsertData', [CreateDB.InsertuserData, CreateDB.InserttripData, CreateDB.InserttfavoriteData, CreateDB.InsertguideData, CreateDB.InsertreviewData]);
app.get('/ShowTables', [CreateDB.ShowTableuser, CreateDB.ShowTableguide, CreateDB.ShowTablefavorite, CreateDB.ShowTabletrip, CreateDB.ShowTablereview]);
app.get('/findTrip', CRUD.getTrips);
app.post('/registerguide',CRUD.insertNewGuide);
app.get('/Favorite', CRUD.getFavorite);
app.get('/ShowTablefavorite', CreateDB.ShowTablefavorite);
app.get('/ShowTableuser', CreateDB.ShowTableuser);
app.get('/ShowTabletrip', CreateDB.ShowTabletrip);
app.get('/ShowTableguide', CreateDB.ShowTableguide);
app.get('/ShowTablereview', CreateDB.ShowTablereview);





app.get('/request_trip/:trip_name', (req, res) => {
    res.cookie('trip_name',req.params.trip_name)
    const trip_name = req.params.trip_name;
    console.log(trip_name);
    const query = ['SELECT * from trip where trip_name = ?', 'select * from review where trip_name=?']
    sql.query(query.join(';'), [trip_name,trip_name], (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({message: "problem"});
            return;
        }
        res.render(path.join(__dirname,'views/request_trip'), {chosen_trip: mysqlres[0][0],tripReview:mysqlres[1]})
    });
});





app.post('/addReview', (req, res) => {
    const tripname = req.cookies.trip_name;
    console.log(tripname);
    const now = new Date();
    const mysqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');
    const reviewParams = {
        "username": req.cookies.username ,
        "trip_name":tripname,
        "review_date":mysqlDatetime,
         "header":req.body.Header,
         "review":req.body.Review
    }
    console.log(reviewParams);
let query = 'INSERT INTO review (username,trip_name,review_date,header,review) VALUES ("'+ reviewParams.username + '","'+reviewParams.trip_name+'","'+reviewParams.review_date+'","'+reviewParams.header+'","'+reviewParams.review+'")';
console.log(query);
sql.query(query, (err, mysqlres) => {
        if (err) {
            console.log("error:", err);
            res.status(400).send({message: "problem"});
            return;
        }
        res.render(path.join(__dirname,'views/find_your_trip'))
    });
});

app.post('/updateUserDetails', (req, res) => {
  // Extract the object data from the request body
  const user=req.cookies.username;
  // Insert the object into the database
  let query = 'UPDATE users SET ';
console.log(req.body.pasword_update);
console.log(req.body.email_update);
console.log(query);

if (req.body.pasword_update){
    query+='password="' + req.body.pasword_update + '"';
    console.log(query);
}
if (req.body.pasword_update&&req.body.email_update){
    query+=','
    console.log(query);
}
if (req.body.email_update){
    query+='email="' + req.body.email_update + '"';
}

query += " WHERE username='" + req.cookies.username + "'";
console.log(query);

    sql.query(query, (err, mysqlres) => {
       if (err) {
            console.log("error:", err);
            res.status(400).send({message: "problem"});
            return;
        }
        res.render(path.join(__dirname,'views/find_your_trip'))
    });
});

app.all('/addToFavorite', (req, res) => {
  const Trip = req.cookies.trip_name;
  const user=req.cookies.username;
  //check if the trip is already exist in the list
  let query='select * from favorite where username=?'
  sql.query(query,user, (err, mysqlres) => {
  if (err) {
      console.log("error:", err);
      res.status(400).send({message: "problem"});
      console.log("the error is in select statment");
      return;
  }
   //if there is favorite in the list - check them
  if (mysqlres.length>0) {
      for (let i = 0; i < mysqlres.length; i++) {
          console.log("the error is in the check of the list");
          console.log(mysqlres[i].trip_name)
          if (mysqlres[i].trip_name == Trip) {
              console.log("this trip already exist in your favorite list");
              return;
          }
      }
  }
  const query1 = 'INSERT INTO favorite (username, trip_name) VALUES (?, ?)';
  const params = [user, Trip];
  sql.query(query1, params, (err, mysqlres) => {
  if (err) {
      console.log("error:", err);
      res.status(400).send({message: "problem"});
      return;
  }
  res.render(path.join(__dirname,'views/find_your_trip'))
  console.log("the trip added secsefuly")
  });

  });

});

app.all('/deleteFromFavorite', (req, res) => {
  const Trip = req.cookies.trip_name;
  const user=req.cookies.username;
  //check if the trip exist in the list
  let query='select * from favorite where username=?'
  sql.query(query,user, (err, mysqlres) => {
  if (err) {
      console.log("error:", err);
      res.status(400).send({message: "problem"});
      console.log("the error is in select statment");
      return;
  }
   //if there is favorite in the list - check them
  if (mysqlres.length>0) {
      for (let i = 0; i < mysqlres.length; i++) {
          console.log("the error is in the check of the list");
          console.log(mysqlres[i].trip_name)
          if (mysqlres[i].trip_name == Trip) {
              //delete the trip
              const query1 = 'DELETE FROM favorite where trip_name= ?';
              const params = [Trip];
              sql.query(query1, params, (err, mysqlres) => {
              if (err) {
                console.log("error:", err);
                res.status(400).send({message: "problem"});
                return;
              }
              res.render(path.join(__dirname,'views/find_your_trip'));
              });
          }
      }
    }

//the list is empty
res.render(path.join(__dirname,'views/find_your_trip'));

  });

});

app.listen(port, () => {
        console.log('Example app listening at http://localhost8080')
    }
);


