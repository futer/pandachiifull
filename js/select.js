var express = require('express');
var mysql = require('mysql');
var app = express();

var connect = mysql.createConnection({
	//proporties...

	host: '',
	user: '',
	password: '',
	database: ''

});

connection.connect(function(){
	//callback
	if(!!error) {
		console.log('error');
	}
	else{
	 	console.log('Connected');
	}

});
