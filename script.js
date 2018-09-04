var express = require('express');
var mysql = require('mysql');
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

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



app.post('/signup', function (req, resp) {
    connection.query("INSERT INTO usertable (ID,name,email,u_name,password,cpassword) values (NULL,'" + req.body.name + "','" + req.body.email + "','" + req.body.u_name + "','" + req.body.password + "','" + req.body.cpassword + "')", function (error, rows, fields) {
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

var options = {
    // Host name for database connection:
    host: 'localhost',
    // Port number for database connection:
    port: 5000,
    // Database user:
    user: 'root',
    // Password for the above database user:
    password: '',
    // Database name:
    database: 'deardiary',
    // Whether or not to automatically check for and clear expired sessions:
    clearExpired: true,
    // How frequently expired sessions will be cleared; milliseconds:
    checkExpirationInterval: 900000,
    // The maximum age of a valid session; milliseconds:
    expiration: 86400000,
    // Whether or not to create the sessions database table, if one does not already exist:
    createDatabaseTable: true,
    // Number of connections when creating a connection pool:
    connectionLimit: 1,
    // Whether or not to end the database connection when the store is closed.
    // The default value of this option depends on whether or not a connection was passed to the constructor.
    // If a connection object is passed to the constructor, the default value for this option is false.
    endConnectionOnClose: true,
    charset: 'utf8mb4_bin',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.get('/login', function (req, resp) {
    connection.query("SELECT * from usertable where email ='" + req.query.email + "' && password ='" + req.query.password + "')", function (errors, rows, fields) {
        if (!!error) {
            console.log('Error in query');
            var object = {};
            object.message = "Failure" + error.message;
            resp.send(JSON.stringify(object));
        } else {
            var object = {};
            object.message = "Welcome " + req.query.email + "!!";
            resp.send(JSON.stringify(object));

        }
    });
})

app.listen(5000);