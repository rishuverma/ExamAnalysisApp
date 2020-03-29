const express=require('express');
const router=express.Router();
const questionTest=require('../models/model');

router.post('/show',(req,res,next)=>{
	questionTest.find({}).exec((err,obj)=>{
		if(err){
			console.log("error in /show");
		} else {
			function shuffle(array) {
				  var currentIndex = array.length, temporaryValue, randomIndex;
				  while (0 !== currentIndex) {
				    randomIndex = Math.floor(Math.random() * currentIndex);
				    currentIndex -= 1;
				    temporaryValue = array[currentIndex];
				    array[currentIndex] = array[randomIndex];
				    array[randomIndex] = temporaryValue;
				  }
				  return array;
				}
				obj = shuffle(obj);
			res.render('showtest',{ questiondb: obj });
		}
	});
	
});
module.exports=router;
