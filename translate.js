var fs = require('fs');

function deleteCache(){
	console.log('Deleting Cache!');
	if (fs.existsSync('./objects/cache.fcz')) {
		fs.unlinkSync('./objects/cache.fcz', function(error) {
			if (error) {
				throw error;
			}
		});	
	}
	
}

function replaceNonASCII(input){
	return input;
	for (i=0;i<input.length;i++)
	{
		input[i]=input[i].replace(/[őóö]/ig,"o")
		input[i]=input[i].replace(/[úűü]/ig,"u")
		input[i]=input[i].replace(/á/ig,"a")
		input[i]=input[i].replace(/é/ig,"e")
		input[i]=input[i].replace(/[ŐÓÖ]/ig,"O")
		input[i]=input[i].replace(/[ÚÜŰ]/ig,"U")
		input[i]=input[i].replace(/Á/ig,"A")
		input[i]=input[i].replace(/É/ig,"E")
	}
	return input;
}

function copyMenu(filename){
	filename = filename.split('.')[0];
	filename = filename[0].toUpperCase()+ filename.slice(1);
	console.log(filename);
	fs.writeFile('language.txt', filename, function(err) {
			if(err) {
				return console.log(err);
			}
	})
	fs.createReadStream(filename+'_menu.txt').pipe(fs.createWriteStream('./languages/'+filename+'.txt'));
}

function loadfile(filename){
	deleteCache();
	copyMenu(filename);
	if (fs.existsSync(filename)) {
		fs.readFile(filename, 'utf8', function(err, contents) {		
	
			contents = contents.split("\n");
			contents.forEach(function(element) {
				element = replaceNonASCII(element.replace(/\t/g,''));
				console.log('Replacing:',element.split(";")[0].replace(/\s/g, '')+'!');
				replaceTextInFile('./objects/'+element.split(";")[0].replace(/\s/g, ''),element.split(";")[1]);
			});
		
	});
	}else{
		console.log("Missing file!")
	}
	

}

function replaceTextInFile(filename,newstring){
		
	fs.readFile(filename, 'utf8', function(err, contents) {		
			
			contents = contents.split("\n");
			contents[1] = newstring + "\r";
			console.log(contents[1]);
			contents = contents.join("\n");
			fs.writeFile(filename, contents, 'utf8', function(err) {
			if(err) {
				return console.log(err);
			}
			
		}); 
	});

}

//
if(typeof(process.argv[2])=="undefined"){
	console.log("Missing argument!\nUse -h for help!");
}else{
	if(process.argv[2] == "-h"|| process.argv[2] == "- h"){
		console.log("The parameter must be an input file. Ex. 'translate.exe hungarian.txt'");
	}else{
		loadfile(process.argv[2]);
	}
}
