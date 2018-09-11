var express = require('express');
var mysql = require('mysql');
var app = express();


var connection = mysql.createConnection({
    //properties...
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deardiary'
});

connection.connect(function (error) {
    if (error != null) {
        console.log(error.message);
    } else {
        console.log("Connected");
    }
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/newUser', function (req, resp) {
    connection.query("INSERT INTO usertable (ID,name,email,u_name,password) values (NULL,'" + req.body.name + "','" + req.body.email + "','" + req.body.u_name + "','" + req.body.password + "')", function (error, rows, fields) {
        if (!!error) {
            console.log('Error in the query');
            var object = {};
            object.message = "Failure " + error.message;
            // resp.send(rows);
            resp.send(JSON.stringify(object));
        } else {
            var object = {};
            object.message = "Successfully inserted User " + req.body.name;
            // resp.send(rows);
            resp.send(JSON.stringify(object));
            //parse with rows/fields
        }
    });
})


app.listen(5000);