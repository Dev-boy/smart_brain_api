// express importálása
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// express hívása az app változón keresztül
const app = express();
// könyvtár az adatbázis kezeléshez
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Assetto',
    database : 'smart_brain'
  }
});

app.use(bodyParser.json());
app.use(cors());

// az app a / győkérben a this is working választ kapja
app.get('/', (req, res) => {res.send(database.users);})
// Sign in útvonal
app.post('/signin', signin.handleSignin(db,bcrypt))
// Register útvonal
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

// az app vagyis az express szerver a 3000-es protot figyeli, 
//a függvény a terminálban ezt közli
app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})