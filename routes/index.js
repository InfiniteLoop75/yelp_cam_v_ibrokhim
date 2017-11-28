const express = require('express');
const Campground = require('../models/campground.js');
const Comment = require('../models/comment.js');
const User = require('../models/user.js');
const passport = require('passport');

var router = express.Router();

router.get('/', function(req, res){
    res.render('landing');
});



router.get('/register',function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            throw err;
            return res.render('register');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/campgrounds');
            });
        }
    });
});

router.get('/login', function(req, res){
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){

});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', "Logged you out!");
    res.redirect('/campgrounds');
});




router.get('/json', function(req, res){
    Campground.find({},function(err, camps){
        res.send({
            Campgrounds: camps
        });
    });
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }   
}
module.exports = router;