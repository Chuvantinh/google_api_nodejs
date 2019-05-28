//read me
/*
you have to install the modul fs and @google/maps
npm install @google/maps
npm install fs
*/

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAXWauGZg8zQ1TMzH4ZXLoNH8fm4HAbzME'
});

const fs = require('fs');
const komma = ", ";

let rawdata = fs.readFileSync('datei.json');  
let list_data = JSON.parse(rawdata);
var address = [];
//I will push data to this array . The length of array is 23804 .
 // The Process for calling google api was running in a few minutes 
//demo adress
//address[0] = '131 Pichelsdofer Strasse, 13595 Berlin';
//address[1] = '1600 Amphitheatre Parkway, Mountain View, CA';
for(var i = 0; i < list_data.length ; i++){
		var districts = new Set(list_data[i].districts);
		var quarters = new Set();
		var streets = new Set();
		
		list_data[i].processed.forEach(
			(phrase)=>{
				if(phrase.ne != ""){
					switch(phrase.ne){
						case "DISTRICT":
							districts.add(phrase.token);
							break;
						case "QUARTER":
							quarters.add(phrase.token);
							break;
						case "STREET":
							streets.add(phrase.token);
							break;
					}
				}
			});
			
	for(let district of districts){
		for(let quarter of quarters){
			for(let street of streets){
				var query = "";
                                
				if(street != undefined &&
		quarter != undefined && 
		district != undefined){
			var query = street + komma + quarter + komma + district;
                        address.push(query);
	}
	//quarter in district
	else if(street == undefined &&
		quarter != undefined && 
		district != undefined){
			var query = quarter + komma + district;
                        address.push(query);
	}
	//street in district
	else if(street != undefined &&
		quarter == undefined && 
		district != undefined){
			var query = street + komma + district;
                        address.push(query);
	}
	//district
	else if(street == undefined &&
		quarter == undefined && 
		district != undefined){
			var query = district;
			address.push(query);
	}
	else{
		console.warning("invalid query parameters");
	}
			}
		}
	}		
        /*        
		console.log("Districts " + i.toString());		
		console.log(districts.values());
		console.log("");
		console.log("Quarters " + i.toString());
		console.log(quarters.values());
		console.log("");
		console.log("Streets " + i.toString());
		console.log(streets.values());
		console.log("");
		
		console.log("Orig Districts " + i.toString());
		console.log(list_data[i].districts.toString());
		console.log("\n\n\n");
                */
   
}

 //console.log(address.length);  //23804 elements

for(var i = 0; i < address.length ; i++){
//console.log(address[i]);
	geocode(address[i]);
}

function geocode(array_address){
	// Geocode an address.
googleMapsClient.geocode({
  //address: '1600 Amphitheatre Parkway, Mountain View, CA'
  //address: '131 Pichelsdofer Strasse, 13595 Berlin'
  address: array_address
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
    let data = JSON.stringify(response.json.results); 
   	 fs.appendFile('jsonfile_google.json', data, function (err) {
  			if (err) throw err;
  			console.log('Saved!');
	});
  }
});
}


//references
//page google api :https://developers.google.com/maps/documentation/geocoding/start
// CODE DEMO :  https://developers.google.com/maps/documentation/geocoding/client-library
//the billig for geocoding api: https://developers.google.com/maps/documentation/geocoding/usage-and-billing
	//0.005 USD per each   (0–100,000)
	
	// 100,001–500,000 request
		//(5.00 USD per 1000)	0.004 USD per each
		//(4.00 USD per 1000)
		
//23.000 = 32 $
// aber ich rechne dann 92 $. keine Ahnung .		
		
//json format online : https://jsonformatter.curiousconcept.com/ 

// check latitude and longitude online , some time not found , do not know about that 
//https://www.latlong.net/Show-Latitude-Longitude.html


//my account : have to register then take an api key https://console.cloud.google.com/