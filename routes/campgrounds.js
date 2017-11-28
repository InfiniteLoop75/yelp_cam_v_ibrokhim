const express = require('express');
const Campground = require('../models/campground.js');
const Comment = require('../models/comment.js');
const middleware = require('../middleware');
var router = express.Router();
router.get('/campgrounds',function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index', {campgrounds: campgrounds, currentUser: req.user});
        }
    });
    
});

router.post('/campgrounds', middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {
        name: name,
        image: image,
        description: desc,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    };
   Campground.create(newCamp, function(err, campCreated){
       if(err){
           console.log(err);
       }else{
            console.log('New Campground Created Successfully!');
            console.log(campCreated);
            console.log(newCamp);
       }
   });
    res.redirect('/campgrounds');
    //redirect to campgrounds page
});
router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
});

router.get('/campgrounds/:id', function(req, res){
    var id = req.params.id;
    Campground.findById(req.params.id).populate('comments').exec(function(err, campgroundFound){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/show', {campground: campgroundFound});
        }
    });

});

// EDIT CAMPGROUND ROUTE
router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req, res){        
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render('campgrounds/edit', {campground: foundCampground});
        });
});
// UPDATE CAMPGROUND ROUTE
router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if(err){
            res.redirect('/campgrounds');
        }else{
            
            res.redirect('/campgrounds/' + updated._id);
        }
    });
});

// DESTROY ROUTE
router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds' + req.params.id);
        }else{
            res.redirect('/campgrounds')
        }
    });
});

module.exports = router;