const express = require('express');
const router = express.Router();
const questionTest = require('../models/model');

router.post('/addQuestion', (req,res,next) => {
	var newQuestion = new questionTest();
	newQuestion.qid = req.body.qid;
	newQuestion.question = req.body.question;
	newQuestion.options.a = req.body.optiona;
	newQuestion.options.b = req.body.optionb;
	// newQuestion.options.c=req.body.optionc;
	// newQuestion.options.d=req.body.optiond;
	newQuestion.category.a = req.body.categorya;
	newQuestion.category.b = req.body.categoryb;
	// newQuestion.category.c=req.body.categoryc;
	// newQuestion.category.d=req.body.categoryd;
	newQuestion.comment.a = req.body.commenta;
	newQuestion.comment.b = req.body.commentb;
	// newQuestion.comment.c=req.body.commentc;
	// newQuestion.comment.d=req.body.commentd;
	newQuestion.save((err,obj) => {
		if(err) {
			res.send("<h1>error while entering in database</h1>");
		} else {
			res.redirect('/adminaddquestion');
		}
	});
});

module.exports=router;
