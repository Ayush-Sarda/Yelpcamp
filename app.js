var express = require('express');
var app = express();
var Comment = require('./models/comment');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require("./models/user");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require('./models/campground');
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");
var seedDB = require('./seeds');
var methodOverride = require('method-override');



app.set("view engine", "ejs");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp_v9",{useNewUrlParser: true});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


// seedDB(); //seed the database

app.use(flash());
//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Once Again you land at the secret page!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function () {
    console.log("SERVER IS NOT CONNECTED!!")
});