var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

const CreateTable = (req,res,next)=> {
    var Q1 = "CREATE TABLE users (username VARCHAR(255) NOT NULL PRIMARY KEY,password VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table users"});
            return;
        }
        console.log('created items table users');
    })
    next()
}
    const CreateTabletrip = (req,res,next)=> {
    var Q2 = "CREATE TABLE trip (trip_name VARCHAR(255) NOT NULL PRIMARY KEY, introduction VARCHAR(1000) NOT NULL, area ENUM('מרכז','גליל עליון','גליל תחתון','כנרת','ערבה','רמת הגולן') NOT NULL, difficult ENUM('קל','קשה','בינוני') NOT NULL, trip_length FLOAT NOT NULL, price FLOAT NOT NULL, link VARCHAR(255) NOT NULL)";
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table trip"});
            return;
        }
        console.log('created items table trip');
    })
        next()
}
const CreateTableFaorite = (req,res,next)=> {
    var Q3 = "CREATE TABLE favorite (username VARCHAR(255) NOT NULL,trip_name VARCHAR(255) NOT NULL,PRIMARY KEY (username, trip_name),FOREIGN KEY (username) REFERENCES users(username),FOREIGN KEY (trip_name) REFERENCES trip(trip_name))";
    SQL.query(Q3,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table favorite"});
            return;
        }
        console.log('created items table table');

    })
    next()
}

const CreateTableguide = (req,res,next)=> {
    var Q4 = "CREATE TABLE guide (phone VARCHAR(20) NOT NULL PRIMARY KEY, GuideName VARCHAR(255) NOT NULL, area ENUM('מרכז','גליל עליון','גליל תחתון','כנרת','ערבה','רמת הגולן') NOT NULL, Seniority int NOT NULL, trip_price FLOAT NOT NULL, about_you TEXT NOT NULL)";
    SQL.query(Q4,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table guide"});
            return;
        }
        console.log('created items table table');
    })
     next()
}

const CreateTablereview = (req,res)=> {
    var Q5 = "CREATE TABLE review (username VARCHAR(255) NOT NULL,trip_name VARCHAR(255) NOT NULL, review_date DATETIME NOT NULL, header VARCHAR(255) NOT NULL, review TEXT NOT NULL, PRIMARY KEY (username, trip_name, review_date), FOREIGN KEY (username) REFERENCES users(username), FOREIGN KEY (trip_name) REFERENCES trip(trip_name))";
    SQL.query(Q5,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table review"});
            return;
        }
        console.log('created items table table');
        res.send("items table created");
    })
}


const Dropreview = (req, res, next) => {
    var Q6 = "drop table review";
    SQL.query(Q6, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table review", err);
            res.status(400).send({message: "error on dropping review table" + err});
            return;
        }

    })
    next()
}
const Dropguide = (req, res, next) => {
    var Q7 = "drop table guide";
    SQL.query(Q7, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table guide", err);
            res.status(400).send({message: "error om dropping guide table" + err});
            return;
        }

    })
    next()
}

const Dropfavorite = (req, res, next) => {
    var Q8 = "drop table favorite ";
    SQL.query(Q8, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table favorite", err);
            res.status(400).send({message: "error om dropping favorite table" + err});
            return;
        }

    })
    next()
}

const Droptrip = (req, res, next) => {
    var Q9 = "drop table trip ";
    SQL.query(Q9, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table trip", err);
            res.status(400).send({message: "error om dropping trip table" + err});
            return;
        }

    })
    next()
}
const Dropusers = (req, res) => {
    var Q10 = "drop table users ";
    SQL.query(Q10, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table users", err);
            res.status(400).send({message: "error om dropping users table" + err});
            return;
        }

    })
            res.send({message:" tables are been dropped whooooho"});
}

const InsertuserData = (req,res,next)=>{
    var Q11 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "csv/users.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "username": element.username,
            "password": element.password,
            "email":element.email
        }
        SQL.query(Q11, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    next();
};

const InserttripData = (req,res,next)=>{
    var Q12 = "INSERT INTO trip SET ?";
    const csvFilePath= path.join(__dirname, "csv/trip.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "trip_name": element.trip_name,
            "introduction": element.introduction,
            "area":element.area,
            "difficult":element.difficult,
            "trip_length":element.trip_length,
            "price":element.price,
            "link":element.link
        }
        SQL.query(Q12, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    next();
};

const InserttfavoriteData = (req,res,next)=>{
    var Q13 = "INSERT INTO favorite SET ?";
    const csvFilePath= path.join(__dirname, "csv/favorite.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "username": element.username,
            "trip_name": element.trip_name
        }
        SQL.query(Q13, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    next();
};

const InsertguideData = (req,res,next)=>{
    var Q14 = "INSERT INTO guide SET ?";
    const csvFilePath= path.join(__dirname, "csv/guide.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "phone": element.phone,
            "GuideName": element.GuideName,
            "area":element.area,
            "Seniority":element.Seniority,
            "trip_price":element.trip_price,
            "about_you":element.about_you
        }
        SQL.query(Q14, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    next();
};

const InsertreviewData = (req,res)=>{
    var Q15 = "INSERT INTO review SET ?";
    const csvFilePath= path.join(__dirname, "csv/review.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "username": element.username,
            "trip_name": element.trip_name,
            "review_date":element.review_date,
            "header":element.header,
            "review":element.review
        }
        SQL.query(Q15, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    });

    res.send("yes");
};

const ShowTableuser = (req,res)=>{
    var Q16= "SELECT * FROM users";
    SQL.query(Q16, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;    });
};

const ShowTabletrip = (req,res)=>{
    var Q17= "SELECT * FROM trip";
    SQL.query(Q17, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;    });
};

const ShowTableguide = (req,res)=>{
    var Q18= "SELECT * FROM guide";
    SQL.query(Q18, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    });
};
const ShowTablereview = (req,res,next)=>{
    var Q19= "SELECT * FROM review";
    SQL.query(Q19, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    });
};

const ShowTablefavorite = (req,res)=>{
    var Q20= "SELECT * FROM favorite";
    SQL.query(Q20, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    });
};

module.exports = {CreateTable,CreateTabletrip,CreateTableFaorite,CreateTableguide,CreateTablereview,Dropfavorite,Dropreview,Dropguide,Droptrip,Dropusers,InsertuserData,InserttripData,InserttfavoriteData,InsertguideData,InsertreviewData,ShowTablefavorite,ShowTablereview,ShowTableguide,ShowTabletrip,ShowTableuser}

