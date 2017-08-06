/*
 * Serve JSON to our AngularJS client
 */

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