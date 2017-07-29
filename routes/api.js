/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.unresolved = function(req, res){
  db.find({selector:{ "type": {"$eq": "task"},"status": {"$eq": "unresolved"}}}, function(er, result) {
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
  var prioridad = req.body.prioridad
  var tipoDeQueja = req.body.tipoDeQueja
  var servicioFallando = req.body.servicioFallando
  var estadoDeAnimo = req.body.estadoDeAnimo
  var task = {type:"task",kind:tipoDeQueja,service:servicioFallando,feeling:estadoDeAnimo,priority:prioridad,status:"unresolved"}
  db.insert(task, function(err, body) {
    if (!err)
      res.write(JSON.stringify(body));
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