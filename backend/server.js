/*
    This file will have sensitive information in it. (mongoDB key, ect.)
    KEEP THIS SAFE.
*/


const express = require('express')
const app = express()
const fs = require('fs')
const csv = require('csv-parser')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://greenEarthAdmin:XsSUzY3Zx3SBy7H9@greenearth-dev.h9roaz7.mongodb.net/?appName=GreenEarth-Dev";

const port = 8080;

var users;

// Dicates comp cost and level of sec
// apparently arround 10-12 
const saltRounds = 10;

var salt;
bcrypt.genSalt(saltRounds, (err, salt) =>{
    if (err){
        // do smthing
    }
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try{
    client.connect();
    client.db("admin").command({ping: 1});
    users = client.db("GreenEarth-Dev").collection("UserLogin");
    console.log("Database connection initilized.")
} finally {

}

app.use(bodyParser.json());

function setCorsHead(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}

app.use(setCorsHead);


// including res here is a shitty hack, someone with more js knowhow prob knows the right way to do it
function handleLogHashing(username, password, res){
    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        console.log('Hash: ', hash)
        var user = { 
            userName : username,
            hash : hash
        };
        users.insertOne(user, errorHandle);
        
        res.sendStatus(200);
    })
    .catch(err => {console.error(err.message);})
    res.sendStatus(401);
}


function comp(username, password){

    
}

function getUser(username){
    const query = {userName : username};
    const data = users.findOne(query);
    return data;
}

// app.get('/api/features', (req, res) => {
//     const csvData = [];
//     fs.createReadStream('./us-state-capitals.csv')
//         .pipe(csv())
//         .on("data", (row) => {
//             const { name, description, latitude, longitude } = row;
//             const data = {
//                 'type': 'Feature',
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [parseFloat(longitude), parseFloat(latitude)]
//                 },
//                 'properties': {
//                     'name': name,
//                     'description': description
//                 }
//             };
//             csvData.push(data);
//         })
//         .on("end", () => {
//             res.json(csvData)
//         })
// })

app.post('/login/auth', (req, res) => {
    console.log("Login Request recived.");
    var username = req.body.username;
    var password = req.body.password;

    var data;

    // Find hash to compare to
    getUser(username).then((result) => {
        data = result;
        console.log(data);

        if(!data) return false;

        var hash = data["hash"];

        if(hash){
            bcrypt
            .compare(password, hash)
            .then(val => {
                console.log(val);
                if(val === true){
                    console.log("yay!")
                    res.sendStatus(200);
                }else{
                    console.log("nah way bro");
                    res.sendStatus(401);
                }
                
                return;
            })
            .catch(err => console.error(err.message))      
        }else{
            console.log("Found data but no hash...");
            res.sendStatus(401);
            return;
        }
    });

    
})

function errorHandle(err, res){
    if (err) throw err;
};

app.post('/login/create', (req, res) => {
    console.log("Account creation request recieved.");
    var username = req.body.username;
    var password = req.body.password;

    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        console.log('Hash: ', hash)
        var user = { 
            userName : username,
            hash : hash
        };
        users.insertOne(user, errorHandle);
        res.sendStatus(200);
        return;
    })
    .catch(err => {console.error(err.message); res.sendStatus(401); return;})

})

app.listen(port, () => {
    console.log('Server is running on port '+ port)
})
