const handleProfile = (req, res) =>{
	const {id} = req.params;
	db.select('*').where({id: id}).from('users')
		.then(user => {
			if (user.length){
			res.json(user[0])//console.log(user)	
		} else {
			res.status(400).json("User not found")
		}
			
	})
	.catch(err => res.status(400).json("Error Getting User"))
	
} // Run in Postman http://localhost:3001/profile/3


// // Alternative Syntax
// const handleProfile = (db, bcrypt) => (req, res) = {
// 	const {id} = req.params;
// 	db.select('*').where({id: id}).from('users')
// 		.then(user => {
// 			if (user.length){
// 			res.json(user[0])//console.log(user)	
// 		} else {
// 			res.status(400).json("User not found")
// 		}
			
// 	})
// 	.catch(err => res.status(400).json("Error Getting User"))
	
// } // Run in Postman http://localhost:3001/profile/3

module.exports = {
	handleSignin : handleProfile
}
