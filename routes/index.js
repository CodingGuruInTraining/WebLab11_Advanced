var express = require('express');
var router = express.Router();
var Lake = require('../models/lake');

/* GET home page. */
router.get('/', function(req, res, next) {
    Lake.find(function(err, lakes){
        if (err) {
            return next(err);
        }
        res.render('index', {title: 'Lake Runner', lakes: lakes});
    })
  // res.render('index', { title: 'Lake Runner' });
});

// POST home page
router.post('/', function( req, res, next){
    console.log(req.body);
    var lakeData = {};
    for (var field in req.body) {
        if (req.body[field]) {
            lakeData[field] = req.body[field];
        }
    }

    var lake = Lake(lakeData);
    lake.save(function(err, newLake){
        if (err) {
            if (err.name == 'ValidationError') {
                var messages = [];
                for (var err_name in err.errors) {
                    messages.push(err.errors[err_name].message);
                }
                req.flash('error', messages);
                return res.redirect('/')
            }
            return next(err);
        }
        console.log(newLake);
        return res.redirect('/')
    })
});

router.post('/addTime', function(req, res, next) {
    if(!req.body.runTime) {
        req.flash('error', 'Need a time entered for ' + req.body.lakeName);
        return res.redirect('/');
    }

    Lake.findById(req.body._id, function(err, lake) {
        if (err) {
            return next(err);
        }
        if (!lake) {
            res.statusCode = 404;
            return next(new Error('Lake with id ' + req.body._id + ' not found'))
        }
        lake.runTimes.push(req.body.runTime);
        lake.save(function(err) {
            if (err) {
                if (err.name == 'ValidationError') {
                    var messages = [];
                    for (var err_name in err.errors) {
                        messages.push(err.errors[err_name].message);
                    }
                    req.flash('error', messages);
                    return res.redirect('/')
                }
                return next(err);
            }
            return res.redirect('/');
        })
    });
});

module.exports = router;
