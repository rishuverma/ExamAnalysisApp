const mongodb=require('mongodb');
const express=require('express'); 
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const fs = require('fs')




const questionTest=require('./models/model');
const responseTest=require('./models/response');
const studentTest=require('./models/signup');
const courseTest=require('./models/courses');
const nodemailer = require('nodemailer');


const addquestionRoute=require('./routes/addquestion');
const showtestRoute=require('./routes/showtest');
const resultRoute=require('./routes/result');
const testRoute=require('./routes/test');
const emailRoute=require('./routes/email');





var pdfGeneratorService=require('./pdfGenerationModule/pdfGeneratorService');





var counter=0;



app=express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

mongoose.connect('mongodb://127.0.0.1:27017/foxmula');
app.use(bodyparser.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));



app.use(addquestionRoute);

app.use('/adminaddquestion',(req,res,next)=>{
	res.render('adminaddquestion',{count:++counter});
});


app.use(resultRoute);


app.use(showtestRoute);



app.use(testRoute.router);

app.use('/check/:testId',(req,res,next)=>{
	var testId=req.params.testId;
	console.log('tid',testId);
	pdfGeneratorService(testId);
	
	setTimeout(()=>{
        console.log('timeout complete for downloading');

        // res.redirect('/download');
        const file='./'+testId+'.pdf';
        //const file = './report.pdf';

        res.download(file);
        
setTimeout(()=>{
    const pathToDelete = './'+testId+'.pdf';

    fs.unlink(pathToDelete, (err) => {
      if (err) {
        console.error('error in app js while deleting',err);
        
      }


      //file removed
    });
},5000);
    },5000);
	

});
// app.use('/download',(req,res,next)=>{
	
// 	const file = './report.pdf';
//   	res.download(file);
// });

app.use('/pdf/:tid',(req,res,next)=>{
    pdfGeneratorService(req.params.tid);
        res.redirect('/email/'+req.params.tid);
    });
app.use('/email/:tid',(req,res,next)=>{
    setTimeout(()=>{
        console.log('timeout complete');
        studentTest.find({testId: req.params.tid}, function(err, testUser) {
        responseTest.find({testId: req.params.tid}, function (err2, responseTest) {
            courseTest.find({}, function (err, courseTest) {
                //console.log('cous  in app.js', courseTest);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'support@inversion.co.in',
                        pass: '1429inversion.co.in'
                    }
                });
                console.log('117');
                console.log(path.join(__dirname,'.',req.params.tid+'.pdf'));
                transporter.sendMail({
                    to:testUser[0]['email'],
                    from : "your Details",
                    subject: "your Details",
                    html: "Hi there,<br>" +
                        "Please find the attached Report for #TheFirstStep<br>",
                        
                    attachments: [{
                        file: "Report.pdf",
                        path: path.join(__dirname,'.',req.params.tid+'.pdf')
                    }]
                });
                setTimeout(()=>{
                    console.log('135');
                        const pathToDelete = './'+req.params.tid+'.pdf';

                        fs.unlink(pathToDelete, (err) => {
                        if (err) {
                        console.error('error in app js while deleting',err);
            
                                    }
                                    //file is removed
                     });

                },6000);
                responseTest['responseobj'] = responseTest[0];
                responseTest['signupobj'] = {};
                responseTest['signupobj']['name'] = testUser[0]['name'];
                responseTest['signupobj']['email'] = testUser[0]['email'];
                responseTest['signupobj']['contact'] = testUser[0]['contact'];
                responseTest['courseobj'] = courseTest;
                res.render('inter_answer', {finalobj: responseTest});
            });
        });
    });
    },5000);
    
    // res.redirect('/sendemail');//----------------------
});
app.use(emailRoute);

app.use('/',(req,res,next)=>{
	res.send('<h1><center>404 page not found</center></h1>');
});

app.listen(3000);
