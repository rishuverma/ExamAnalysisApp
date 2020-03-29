const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const studentTest = require('../models/signup');
const responseTest = require('../models/response');
const courseTest = require('../models/courses');
var Id;
var pdfGeneratorService=require('../pdfGenerationModule/pdfGeneratorService');
var nodemailer = require('nodemailer');
var paths = require('path');
router.get("/", function(req, res){
    res.render("test", { flag: false });
});


router.post("/test", function(req, res){
        Id = shortid.generate();
        module.exports.testid2 = Id;
        var emailid = req.body.email;
        module.exports.emailid = emailid;
        var newStudent = { testId: Id, name: req.body.name, email:req.body.email, contact: req.body.contact, college: req.body.college };
        studentTest.create(newStudent, function(err, studentTest){
            if(err){
                // res.send("<script>window.location.href='http://localhost:3000/test';\
                //     alert('This emailid is already used');\
                //     </script>");
                console.log(err);
                res.render("test", {'flag': true});
            }
            else{
                res.redirect(307,'/show');
            }
        });
   // });   
});

module.exports = {
        router: router,
		testId: Id
};

