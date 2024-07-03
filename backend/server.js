const express = require('express')
const app = express()
const fs = require('fs')
const csv = require('csv-parser')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

const port = 8080;

// Dicates comp cost and level of sec
// apparently arround 10-12 
const saltRounds = 10;

var salt;
bcrypt.genSalt(saltRounds, (err, salt) =>{
    if (err){
        // do smthing
    }
});

app.use(bodyParser.json());

function setCorsHead(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
}

app.use(setCorsHead);



function handleLogHashing(password){
    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
        console.log('Salt: ', salt)
        return bcrypt.hash(password, salt)
    })
    .then(hash => {
        console.log('Hash: ', hash)
        comp(password, hash);
        comp("swaggermssiash", hash);
        return true;
    })
    .catch(err => console.error(err.message))
}


function comp(password, hash){
    bcrypt
      .compare(password, hash)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => console.error(err.message))      
}

app.get('/api/features', (req, res) => {
    const csvData = [];
    fs.createReadStream('./us-state-capitals.csv')
        .pipe(csv())
        .on("data", (row) => {
            const { name, description, latitude, longitude } = row;
            const data = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [parseFloat(longitude), parseFloat(latitude)]
                },
                'properties': {
                    'name': name,
                    'description': description
                }
            };
            csvData.push(data);
        })
        .on("end", () => {
            res.json(csvData)
        })
})

app.post('/login/auth', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var logIn = handleLogHashing(password);
    

    return logIn;
})

app.listen(port, () => {
    console.log('Server is running on port '+ port)
})
