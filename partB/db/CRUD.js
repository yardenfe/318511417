const sql = require('./db');
const path = require("path");

const CheckLogin = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    const UserData = {
        "username": req.body.username_login,
        "password": req.body.password_login
    }
    console.log(req.body.username_login);
    const Q2 = 'SELECT * FROM users where username = ? and password= ?';
    sql.query(Q2, [UserData.username, UserData.password], (err, result) => {
            if (err) {
                console.log("error: error: ", err);
                res.status(400).send({message: "could not search"});
                return;
            }

            if (result.length > 0) {
                res.cookie('username',result[0].username)
                res.render(path.join(__dirname,'../views/find_your_trip'))
            } else {
                res.status(400).send({message:"invalid username or password"});
            }
        }
    )
}

const insertNewGuide = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    // insert input data from body into json
    const NewGuide = {
        "GuideName": req.body.fullname,
        "phone": req.body.phone,
        "area": req.body.area_guide,
        "Seniority":req.body.trining,
        "trip_price":req.body.price,
        "about_you":req.body.about
    }
    const Q1='select phone from guide where phone =?'
    sql.query(Q1, NewGuide.phone, (err, mysqlres) => {
    if (mysqlres.length > 0) {
            console.log("the phone already exist in the DB, check if you already register before.")
            res.render(path.join(__dirname, '../views/register_guide.pug'))
    }

   else{
    //run qurey
    const Q2 = 'INSERT INTO guide SET ?';
    sql.query(Q2, NewGuide, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not create new guide"});
            return;
        }
        res.render(path.join(__dirname, '../views/find_your_trip.pug'))
        return;
            })
        }
        ;

    });
}


const insertNewSignIn = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    // insert input data from body into json
    const NewSignUp = {
        "username": req.body.username_signup,
        "password": req.body.password_signup,
        "email": req.body.email_signup,
    }
    //check if the username already exist///////////////////////////////
    const Q2 = 'select username from users where username=?';
    sql.query(Q2, NewSignUp.username, (err, mysqlres) => {
        if (mysqlres.length > 0) {
            console.log("the username already exist in the DB, please choose another one.")
            res.status(200).send({success: false, message: "the username already exist in the DB, please click return and choose another one"});
}

        //run qurey
        else {
            const Q1 = 'INSERT INTO users SET?';
            sql.query(Q1, NewSignUp, (err, mysqlres) => {
                if (err) {
                    console.log("error: error: ", err);
                    res.status(400).send({message: "could not sign in"});
                    return;
                }
                console.log("create users:", {id: mysqlres.insertId});
                res.render(path.join(__dirname, '../views/login.pug'),{ message: 'Sign up successful!' })
                return;
            })
        }
        ;

    });
}


const InserReview = (req, res) => {
    //validate date
    if (!req.body) {
        res.status(400).send({message: "content cannot be empty"})
        return;
    }
    // insert input data from body into json
    const NewSignUp = {
        "trip_name": req.params.trip_Name,
        "username": req.cookie.username,
        "header": req.body.header,
    }
    //run qurey
    const Q1 = 'INSERT INTO users SET?';
    sql.query(Q1, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not sign in"});
            return;
        }
        console.log("create users:", {id: mysqlres.insertId});
        res.render(path.join(__dirname, '../views/login.pug'))
        return;
    })

}


const getGuides=(req,res)=> {
    let query = 'select * from guide'
    sql.query(query, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not find trips"});
            return;
        };
        res.render(path.join(__dirname, '../views/find_guide.pug'), {Guides: mysqlres})
    });
}


const getFavorite = (req, res) => {
    if(req.cookies.username==""){
        res.render("login.pug");
    }
    let qurey = 'SELECT * FROM favorite WHERE username  = ? '
    const username=req.cookies.username;
    sql.query(qurey, username,(err, mysqlres) => {
     if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not get favorite"});
            return;
        };
     res.render(path.join(__dirname, '../views/My_favorite.pug'), {favoriteList: mysqlres})
        return;
    })
}


const getTrips = (req, res) => {
    //validate date
    const tripSearchParams = {
        "area": req.query.Area,
        "difficult": req.query.hardness,
        "price_from": req.query.price_from,
        "price_to": req.query.price_to,
        "Length_from": req.query.Length_from,
        "Length_to": req.query.Length_to,
    }
    console.log(tripSearchParams);

    let qurey = 'SELECT trip_name,introduction,area,difficult,trip_length,price,link FROM trip WHERE area  = ? '
    let filters = [tripSearchParams.area];

    if (tripSearchParams.difficult) {
        qurey += ' AND difficult = ? '
        filters.push(tripSearchParams.difficult)
    }
    if (tripSearchParams.Length_from) {
        qurey += ' AND trip_length >= ? '
        filters.push(tripSearchParams.Length_from)
    }

    if (tripSearchParams.Length_to) {
        qurey += ' AND trip_length <= ? '
        filters.push(tripSearchParams.Length_to)
    }
    if (tripSearchParams.price_from) {
        qurey += ' AND price >= ? '
        filters.push(tripSearchParams.price_from)
    }
    if (tripSearchParams.price_to) {
        qurey += ' AND price <= ? '
        filters.push(tripSearchParams.price_to)
    }

    //run qurey
    console.log(qurey);
    sql.query(qurey, filters, (err, mysqlres) => {
        console.log(filters)
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not find trips"});
            return;
        }
        res.render(path.join(__dirname, '../views/your_trips.pug'), {tripResult: mysqlres})
        return;
    })
}


const updateUser= (req, res) => {
    const UserUpdateParams = {
        "username": req.body.username_update,
        "password":req.body.pasword_update,
        "email":req.body.email_update
    }
    console.log(UserUpdateParams);
    let qurey = 'UPDATE users set '

    if (UserUpdateParams.password) {
        console.log(UserUpdateParams.password);
        qurey += 'password = '+UserUpdateParams.password
    }
     if (UserUpdateParams.email) {
        console.log(UserUpdateParams.email);
        qurey += 'email = '+UserUpdateParams.email
     }

     qurey += " WHERE username= '"+UserUpdateParams.username+"'"
     console.log(qurey);
    sql.query(qurey, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not update"});
            return;
        };
        res.render(path.join(__dirname, '../views/find_your_trip.pug'))
    });
};



module.exports = {insertNewSignIn, CheckLogin, getTrips,insertNewGuide,getGuides,updateUser,getFavorite}

