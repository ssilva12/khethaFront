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
var http = require('http');
var url = 'http://guarded-atoll-31281.herokuapp.com/'
//var url = 'http://localhost:9000/'

exports.uploadMeta = function(req, res){
  if(typeof require !== 'undefined') XLSX = require('xlsx');
  var workbook = XLSX.readFile(req.file.path);
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  var keys = Object.keys(worksheet);
  var json = XLSX.utils.sheet_to_json(worksheet);
  var responses = [];
  for (var i = 0; i < json.length; i++){
    var obj = json[i]; 
    console.log(obj);
    request.post({
          headers: {'content-type':'application/json'},
          url:url+'createMetaretionship',
          form:{er:obj["Name"],dic:obj["Dictionary"]}
      },function(error, response, body){
        responses.push(response.body);
        if(responses.length == json.length){
          res.send(JSON.stringify({ responses }));
        }
    }); 
  } 
}

exports.upload = function(req, res){
  if(typeof require !== 'undefined') XLSX = require('xlsx');
  var workbook = XLSX.readFile(req.file.path);
  var first_sheet_name = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[first_sheet_name];
  var keys = Object.keys(worksheet)
  var json = XLSX.utils.sheet_to_json(worksheet);
  var metaId = req.body.meta.id
  var metaDictionary = req.body.meta.dictionary
  debugger;
  var responses = [];
  for (var i = 0; i < json.length; i++){
    var obj = json[i];
    request.post({
          headers: {'content-type':'application/json'},
          url:url+'createNoun',
          form:{er:obj["Name"],dic:obj["Dictionary"],metaId:metaId,metaDictionary:metaDictionary}
      },function(error, response, body){
        responses.push(response);
        if(responses.length == json.length){
          res.send(JSON.stringify({ responses }));
        }
    }); 
  } 
}