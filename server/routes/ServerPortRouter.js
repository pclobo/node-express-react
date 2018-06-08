const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
const request = require('request');

ServerPortRouter.route('/country').get(function (req, res) {
    request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: `https://api.mercadolibre.com/classified_locations/countries/BR`,
        method: 'GET'
      }, (err,respo,body) => {
        if(err) console.error(err);
        else {
          const country = JSON.parse(body);
          res.end(JSON.stringify(country.states))
        }
      });
});

ServerPortRouter.route('/state/:id').get(function (req, res) {
    request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri:  'https://api.mercadolibre.com/classified_locations/states/'+req.params.id,
        method: 'GET'
      }, (err,respo,body) => {
        if(err) console.error(err);
        else {
          const state = JSON.parse(body);
          res.end(JSON.stringify(state.cities))
        }
      });
});

ServerPortRouter.route('/city/:id').get(function (req, res) {
    request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: 'https://api.mercadolibre.com/classified_locations/cities/'+req.params.id,
        method: 'GET'
      }, (err,respo,body) => {
        if(err) console.error(err);
        else {
          const city = JSON.parse(body);
          res.end(JSON.stringify(city.neighborhoods))
        }
      }
    );
});

ServerPortRouter.route('/neighborhood/:id').get(function (req, res) {
    request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: 'https://api.mercadolibre.com/classified_locations/neighborhoods/'+req.params.id,
        method: 'GET'
      }, (err,respo,body) => {
        if(err) console.error(err);
        else {
          const neighborhood = JSON.parse(body);
          res.end(JSON.stringify(neighborhood.subneighborhoods))
        }
      }
    );
});

ServerPortRouter.route('/').get(function (req, res) {    
    
      res.json('{hola}');
});

module.exports = ServerPortRouter;