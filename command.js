var fs = require('fs');
var request = require('request');

module.exports.pwd = function(stdin, filename, done) {
	var output = process.cwd()
	done(output)
}

module.exports.date = function(stdin, filename, done){
	var date = new Date()
	var output = date.toDateString() + date.toTimeString()
	done(output)
}

module.exports.ls = function(stdin, filename, done){
	var output = ""
	fs.readdir('.', function(err, files) {
	  if (err) throw err;
	  files.forEach(function(file) {
	    output += ( file.toString() + "\n");
	  })
	  done(output)
	});
}

module.exports.echo = function(stdin, filename, done){
	var output
	if ( arg === "$HOME"){
		output = process.env.HOME
	} else {
		output = arg
	}
	done(output)
}

module.exports.cat = function(stdin, filename, done) {
	fs.readFile(correctInputType(), 'utf8', function(err, data) {
  		if (err) throw err;
  		var output = data
  		done(output)
	});
}

module.exports.head = function(stdin, filename, done) {
	fs.readFile(correctInputType(), 'utf8', function(err, data) {
  		if (err) throw err;
  		data = data.split('\n')
  		var output = ""
  		
  		for (let i = 0; i < 5; i++) {
	  		output += data[i] + "\n"
  		}
  
  		done(output)
	});
}

module.exports.tail = function(stdin, filename, done) {
	fs.readFile(correctInputType(), 'utf8', function(err, data) {
  		if (err) throw err;
  		data = data.split('\n')
  		let start = data.length - 5
  		var output = ""
  		for (let i = start; i < data.length; i++) {
	  		output += data[i] + "\n"
  		}
  		done(output)
	});
}

module.exports.sort = function(stdin, filename, done) {
	fs.readFile(correctInputType(), 'utf8', function(err, data) {
  		if (err) throw err;
  		data = data.split('\n')
  		var output = ""
  		
  		newData = data.map(function(line) {
  			return line.trim();
  		}).sort();
  		
  		for (let i = 0; i < newData.length; i++) {
	  		output += newData[i] + "\n"
  		}

  		done(output)
  		
	});
}

module.exports.wc = function(stdin, filename, done) {
	fs.readFile(correctInputType(), 'utf8', function(err, data) {
  		if (err) throw err;
  		data = data.split('\n')
	  	var output = data.length.toString();
	  	done(output)
	});
}

module.exports.request = function(stdin, filename, done){
	request(arg, function (err, response, body) {
		if (err) throw err;

		if (response.statusCode == 200) {
			var output = body
			done(body)  // Show the HTML for the Google homepage.
		}
	})
}