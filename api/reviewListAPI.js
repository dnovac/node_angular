/**
 * Created by dnovac on 17.03.2017.
 */

var express = require('express');
var router = express.Router();

var config    = require('../config/config_w_nconf'),
    couchbase = require("couchbase"),
    uuid      = require('uuid');


var cluster = new couchbase.Cluster('10.185.5.69:8091');

var bucket = cluster.openBucket('moviesbucket', '123456', function(err) {
    if (err) {
        // Failed to make a connection to the Couchbase cluster.
        throw err;
    }
});

//Create a List of Reviews
router.post('/', function(req, res) {
    console.log('Create review list of movies...');

    var jsonObject = {};
    var doctype = "review";

    var documentKey =  doctype + "." + uuid.v1();
    jsonObject.doctype=doctype;
    jsonObject.id=documentKey;

    Object.keys(value).forEach(function (key) {
        jsonObject[key] = value[key];
    });

    bucket.insert(documentKey, jsonObject, function(error, result) {
        if(error) {
            return callback(error, null)
        };
        callback(null, {message: "success", data: result});
    });
});

