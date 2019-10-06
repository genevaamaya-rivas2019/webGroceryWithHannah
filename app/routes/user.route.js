module.exports = function (app) {

	var express = require("express");
	var router = express.Router();

	const users = require('../controllers/user.controller.js');

	var path = __basedir + '/views/';

	router.use(function (req, res, next) {
		console.log("/" + req.method);
		next();
	});

	app.get('/', (req, res) => {
		res.sendFile(path + "index.html");
	});

	// Save a User to MongoDB
	// app.post('/api/users/save', users.save);


	app.get("/item/retrieve/:item", (req, res) => {
		var item_search = {}
		if (req.params.item != "all") {
			item_search.id = req.params.item
		}
		users.findAll(res, item_search)
	})
	// Retrieve all Users
	app.get('/item/create', (req, res) => {
		users.save(req.query, res)
	});

	app.get('/item/delete/:id', (req, res) => {
		users.delete(req, res);
	});

	app.put('/item/update/:id', (req, res) => {
		// users.save(req.query,res);	
		// console.log("Update Item running..");	
		// users.delete(req,res);
		let id = req.params.id;
		users.update(req,res,id);
	});

	app.get("*", (req, res) => {
		res.sendFile(path + "404.html");
	});
}