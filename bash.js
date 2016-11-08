var command = require('./command.js');


// // Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {

  	// var input = data.toString().trim().split(' '); // remove the newline
  	var cmdString = data.toString().trim()
  	var cmdList = cmdString.split(/\s*\|\s*/g) // e.g. ['cat bash.js', 'head', 'wc']
  	var cmdAndFile = cmdList[0].split(' ')
  	var firstCmd = cmdAndFile[0] // e.g. 'cat'
  	var filename = cmdAndFile[1] // e.g. 'bash.js'
  	cmdList[0] = firstCmd // ['cat', 'head', 'wc']

	var done = function(output){
		while (cmdList.length) {
			console.log(cmdList)
			command[cmdList.shift()](output, null, done)
		}

		process.stdout.write(output)
		process.stdout.write("\nprompt > ");
	}

  	if(typeof command[firstCmd] !== "function"){
	  	done("Whoopsie!")
	} 

  	// No pipes were part of the input, so just execute like normal
  	else {
  		var output = command[cmdList.shift()](null, filename, done)
  	}
});