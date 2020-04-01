var fs = require('fs');

fs.readdir('./objects', function(err, items) {
    for (var i=0; i<items.length; i++) {
		loadfile('./objects/'+items[i]).then((v2) => {
			 console.log(v2);
		});
       
    }
});

function loadfile(filename){
		return new Promise((resolve, reject) => {
		fs.readFile(filename, 'latin1', function(err, contents) {
			
			if(filename != "./objects/nextObjectNumber.txt" && filename != "./objects/cache.fcz"&& filename != "./objects/groundHeat_4.txt"){
					resolve(filename.split("/")[2] + ";" + contents.split("\n")[1]);
			}
		});
		})
	
	
}


