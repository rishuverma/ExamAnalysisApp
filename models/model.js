const mongoose=require('mongoose');

const schema=mongoose.Schema;

const QuestionSchema=new schema({
	qid:{
		type:String,
		//required:true,
		//unique:true
	},
	question:{
		type:String,
		//required:true,
		//unique:true
	},
	options:{
		a:{
			type:String,
			default:''
		},
		b:{
			type:String,
			default:''
		},
		// c:{
		// 	type:String,
		// 	default:''
		// },
		// d:{
		// 	type:String,
		// 	default:''
		// }
	},
	category:{
		a:{
			type:String,
			default:''
		},
		b:{
			type:String,
			default:''
		},
		// c:{
		// 	type:String,
		// 	default:''
		// },
		// d:{
		// 	type:String,
		// 	default:''
		// }

	},
	comment:{
		a:{
			type:String,
			default:''
		},
		b:{
			type:String,
			default:''
		},
		// c:{
		// 	type:String,
		// 	default:''
		// },
		// d:{
		// 	type:String,
		// 	default:''
		// }

	}
});
module.exports=mongoose.model('questionTest',QuestionSchema);