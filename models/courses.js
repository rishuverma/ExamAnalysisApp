const mongoose=require('mongoose');
const schema=mongoose.Schema;

const CourseSchema=new schema({

	// courses:[{
	// 	courseid:String,
	// 	coursename:String
	// }]
	courseid:[String],
	coursename:[String]


});
module.exports=mongoose.model('courseTest',CourseSchema);