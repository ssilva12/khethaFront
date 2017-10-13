/*
 * Serve JSON to our AngularJS client
 */
var http = require('http');
var request = require('request');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'


exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.unresolved = function(req, res){
  db.find({selector:{ "type": {"$eq": "medical_care"},"status": {"$eq": "unresolved"}}}, function(er, result) {
		if (er == null){
			res.write(JSON.stringify(result));
		}
		else{
      console.log("se churretio");
      res.write(JSON.stringify(result));
		}
    res.end()
	});
}

exports.create = function(req, res){
  var name = req.body.name
  var identification = req.body.id
  var type = req.body.type
  var hour = req.body.hour
  var reason = req.body.reason
  var task = {type:"medical_care",name:name,identification:identification,kind:type,hour:hour,reason:reason,status:"unresolved"}
  
  db.insert(task, function(err, body) {
    if (!err)
      //res.write(JSON.stringify(body));
      res.redirect('/');
      res.end()
    });
}

exports.solve = function(req, res){
  var id = req.body.id
  db.find({selector:{ "_id": {"$eq": id}}}, function(er, result) {
    result["status"] = "solved";
    var id = result["docs"][0]["_id"];
    var rev = result["docs"][0]["_rev"];
    db.destroy(id, rev, function(err, result) {
        res.write(JSON.stringify(result));
        res.end()
    });
	});
}


exports.upload = function(req, res){
  

  callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
    });
  } 

  if(typeof require !== 'undefined') XLSX = require('xlsx');
  var workbook = XLSX.readFile(req.file.path);
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  var keys = Object.keys(worksheet)
  var json = XLSX.utils.sheet_to_json(worksheet)
  var http = require('http');
  //var url = 'http://guarded-atoll-31281.herokuapp.com/'
  var url = 'http://localhost:9000/'
  for (var i = 0; i < json.length; i++){
    var obj = json[i];
    debugger;
    request.post({
          headers: {'content-type':'application/json'},
          url:url+'createPrimary2',
          form:{er:obj["Name"],dic:obj["Dictionary"]}
      },function(error, response, body){
        debugger;
      console.log(body)
    }); 
  }
  
}