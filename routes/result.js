const express = require('express');
const router = express.Router();
const questionTest = require('../models/model');
const responseTest = require('../models/response');
const courseTest = require('../models/courses');

const testId = require('./test');


router.post('/result',(req,res,next) => {
	var fullbody=req.body;
	questionTest.find({}).exec((err,obj)=>{
		if(err){
			console.log("error here");
		}else{
			var qids=[];
			var responses=[];
			var answered=[];
			var percentage=[];
			var totalcourse=[];
			for (var x of obj){
				//console.log(x.qid);
				var name=x.qid;
				//console.log(fullbody[name]);
				//console.log(name);
				qids.push(name);
				responses.push(fullbody[name]);


			}
			courseTest.find({}).exec((error,coursetestobj)=>{
				if(error){
					console.log(error,'in result route')
				}else{
					console.log('course test object here',coursetestobj);

					//console.log('coursetestobj 0th index',coursetestobj[0]);
					for(let cid of coursetestobj[0].courseid){
						var anObj={'courseid':cid,
							'count':0};
						var anObj2={'courseid':cid,
							'count':0};
						//console.log('cidis',cid);
						//console.log('\n\n\nobject in totalcourse',anObj);
						totalcourse.push(anObj);
						answered.push(anObj2);

					}
					//console.log('\n\n\n\ninitial totalcourse',totalcourse,answered);
					//console.log('\n\n\nanswered50',answered);
					//counting total courses
					for(let q of qids){
						for(var cat of obj){
							if(q===cat.qid){
								var caa=cat.category.a;
								var cab=cat.category.b;
								for(let totalc of totalcourse){
									if(totalc.courseid===caa){
										totalc.count++;
										//console.log('\n\n\n\n\ninside if 1 \n\n\n\n\n');
									}
									if(totalc.courseid===cab){
										totalc.count++;
										//console.log('\n\n\n\n\ninside if 2 \n\n\n\n\n');
									}
								}
							}
						}
						//console.log('\n\n\nanswered69',answered,'total',totalcourse);

					}
					//counting courses what student has answered
					for(var i=0;i<qids.length;i++){
						for(var x of obj){
							if(x.qid===qids[i]){
								for(var ans of answered){
									if(ans.courseid===x.category[responses[i]] && responses[i]!=null && responses[i]!=''){
										ans.count++;
									}
								}

							}
						}
					}
					var maxper=0;
					var suggestedCourse='';
					for(let ans of answered){
						for(let total of totalcourse){
							if(ans.courseid===total.courseid){
								var totalcount=1;
								if(total.count!=0){totalcount=total.count}
								var perc=parseInt((ans.count/totalcount)*100);
								if(perc>maxper){
									maxper=perc;
									suggestedCourse=ans.courseid;
								}
								var anObj={
									'courseid':ans.courseid,
									'percent':perc
								};
								percentage.push(anObj);
							}
						}
					}

					var newResponse=new responseTest();
					newResponse.testId=testId.testid2;
					newResponse.qids=qids;
					newResponse.responses=responses;
					newResponse.categorypercentarray=percentage;
					newResponse.category=answered;
					newResponse.suggestion=suggestedCourse;
					console.log('in result', newResponse);
					newResponse.save((err,obj)=>{
						if(err){
							res.send('<h1> err in inserting in db responses');

						}else{
							res.redirect('/pdf/' + newResponse.testId);
						}
					});
				}

			});
		}
	});
});

module.exports=router;
