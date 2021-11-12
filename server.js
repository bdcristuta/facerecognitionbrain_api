const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

// Connecting to DB
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5433,
    user : 'bobby',
    password : 'smartbrain1@',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data)
})

//console.log(postgres.select('*').from('users'))


const app= express();
app.use(bodyParser.json())
app.use(cors())

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}
]

app.get('/', (req, res) => {

	res.send(database.users);
})

// Test in POSTMAN POST localhost:3000/signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})


// Register user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //dependency injections

// Get user profile by id
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})


// Update entries user
app.put('/image',(req, res) => { image.handleImage(req, res, db)})

// Handle API call
app.post('/imageurl',(req, res) => { image.handleApiCall(req, res)})



app.listen(3001, () => {
	console.log('App is running on port 3001')
})


//alternative syntax
//app.get('/profile/:id', register.handleProfile(db)(req, res))







/* Endpoints
/ --> res = this is working
/signin --> POST Request success/fail --> password hidden
/register --> POST = new user object
/profile/:userid --> GET = user
/image --> PUT update user 


*/

// // Update entries user
// app.put('/image',(req, res) =>{
// 	const {id} = req.body;
// 	db('users').where('id', '=', id)
// 	.increment('entries', 1)
// 	.returning('entries')
// 	.then(entries => {
// 		res.json(entries[0]); //console.log(entries)
// 	})
// 	.catch(err => res.status(400).json('Unable to get count entries'))
// })

// Bcript encyption
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
