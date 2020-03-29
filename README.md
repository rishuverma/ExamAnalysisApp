# ExamAnalysisApp
The App enables student to take exam on the platform and calculate the score with a report which is also emailed to the student using sendgrid.<br/>
install node_modules by commad <br/>
`npm install`<br/>
run the app using<br/>
`node app`<br/>
go to route `/adminaddquestion` where admin can add questions for the test with some comments that can be shown in the report<br/>
on localhost:3000 you will get the sign in page where you provide with the details.<br/>
Answer all the questions and get the report on next webpage.<br/>
A more Detailed report with the comments that were added by admin is sent by email for that you need to change the credentials in the email.js route for your own sendgrid account.<br/>
