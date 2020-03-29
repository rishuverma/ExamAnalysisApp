const mongoose = require('mongoose');
const schema = mongoose.Schema;


var StudentSchema = new schema({
    testId : String,
    name : String,
    email : String,
    contact : String,
    college : String
});

//var Student = mongoose.model("Student", studentSchema);
module.exports=mongoose.model('signupTest', StudentSchema);

//db.signuptests.insert({testId:'test0',name:'sachin',email:'rishurv97@gmail.com',contact:'213213',college:'sdfaasdfa'});

