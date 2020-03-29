const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema=new Schema({
	testId:{
		type:String
	},
	suggestion: {
		type: String
	},
	qids: [String],
	responses: [String],
	categorypercentarray: [
		new Schema(
			{
				courseid: String,
				percent: Number
			})
	],
	category:[
		new Schema({
			courseid: String,
			count: Number
		})
	],
    dateCreated: {
	    type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports=mongoose.model('responseTest',ResponseSchema);