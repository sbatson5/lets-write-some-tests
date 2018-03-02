/* global module, require */
module.exports = function(app) {
  var express = require('express');
  var router = express.Router();
  var user = require('../json/user.json');

  router.get('', function(req, res) {
    res.send(user);
  });

  router.get('/:id', function(req, res) {
    const id = req.id || 1;
    let response = {};
    response.data = user.data[id - 1];
    res.send(response || {});
  });

  router.patch('/:id', function(req, res) {
    res.send(204);
  });

  app.use('/api/users', router);
};
