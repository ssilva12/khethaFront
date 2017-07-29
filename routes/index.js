
/*
 * GET home page.
 */
database = require('../routes/db');
var db = database.connect();
exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};