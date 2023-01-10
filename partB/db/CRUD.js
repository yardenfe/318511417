const sql=require('./db');


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

    //run qurey
    const Q1 = 'INSERT INTO users SET?';
    sql.query(Q1, NewSignUp, (err, mysqlres) => {
        if (err) {
            console.log("error: error: ", err);
            res.status(400).send({message: "could not sign in"});
            return;
        }
        console.log("create users:", {id: mysqlres.insertId});
        res.send({massage: "you just signed in successifuly"});
        return;
    })

}

module.exports={insertNewSignIn}