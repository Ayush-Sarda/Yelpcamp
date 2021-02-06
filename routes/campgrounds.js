var express = require('express');
var router = express.Router();
var Campground = require('../models/campground'); 
var middleware = require('../middleware'); 


//index page
router.get("/", function (req,res) {

	Campground.find({}, function(err,allCampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index",{campgrounds: allCampground, currentUser: req.user});
		}
	});

});

//logic for adding new campgrounds
router.post("/",middleware.isLoggedIn, function (req,res) {
    var name = req.body.name;
    var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
    var newCamp = {name: name, image: image, description: desc, author: author, price: price};
    Campground.create(newCamp,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})
    

});

router.get("/new",middleware.isLoggedIn, function (req,res) {
    res.render("campgrounds/new");
});

//show more details of a campground
router.get("/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			console.log(foundCampground);
			res.render("campgrounds/show",{campgrounds: foundCampground});
		}
	});	
});

//EDIT campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campgrounds: foundCampground});
		});
});

//UPDATE campground route 
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DELETE campground
router.delete("/:id",middleware.checkCampgroundOwnership,async(req, res) => {
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error.message);
    res.redirect("/campgrounds");
  }
});

// router.delete("/:id", function(req,res){
// 	Campground.findByIdAndRemove(req.params.id, function(err){
// 		if(err){
// 			res.redirect("/campgrounds");
// 		} else{
// 			res.redirect("/campgrounds");
// 		}
		
// 	})
// })




module.exports = router;