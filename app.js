const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localStrategy = require('passport-local');
const passport = require('passport');
const methodOverride = require('method-override');
const Campground = require('./models/campground.js');
const Comment = require('./models/comment.js');
const User = require('./models/user.js');
const seedDB = require('./seeds');
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');
const indexRoutes = require('./routes/index');
const flash = require('connect-flash');


console.log(methodOverride());
// seedDB();
mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'Hey now brown Cow',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000, function(){
    console.log('Server is running with PORT 3000');
});
