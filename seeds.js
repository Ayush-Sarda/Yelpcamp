var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
	name: "Cloud's Rest",
	image: "https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280__480.jpg",
	description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	},
	{
	name: "Desert's Ground",
	image: "https://cdn.pixabay.com/photo/2020/02/19/23/21/van-4863478__480.jpg",
	description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	},
	{
	name: "Canyon FLoor",
	image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__480.jpg",
	description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
	}
		   ]


function seedDB(){
	//remove all Campground
	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	} else {
		console.log("REMOVED");
		//add Campground
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){
				console.log(err);
			} else{
				console.log("Data added");
				//add comment
				Comment.create({
					text: "This place is good, I wish it was uploaded on internet.",
					author: "Shreyansa"
				}, function(err,comment){
					if(err){
						console.log(err);
					} else{
						campground.comments.push(comment);
						campground.save();
						console.log("Created new comment");
					}
				});
			}
		});
	});
	}
});
	
	
	
	
	
	//add comments
};

module.exports = seedDB;