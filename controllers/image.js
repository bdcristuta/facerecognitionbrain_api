const Clarifai = require('clarifai')

// Set Up Clarifai API
const app = new Clarifai.App({
  apiKey: '3ec7379798c44bf2aef6a46cc8af61a1'
 });

const handleApiCall = (req, res) => {	
 app.models
 	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 	.then(data => {
 		res.json(data)
 	})
 	.catch(err => res.status(400).json('Unable to work with json'))
}


const handleImage = (req, res, db) =>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]); //console.log(entries)
	})
	.catch(err => res.status(400).json('Unable to get count entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall

}