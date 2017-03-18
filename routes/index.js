var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Listify' });
});

router.get('/:name?', function(req, res){
	var name = req.params.name;
	res.render('pages/index', {title: name});
});

/*router.get('*', function(req, res){
	res.send("Bad Request");
});*/

module.exports = router;


