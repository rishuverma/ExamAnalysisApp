const responseTest=require('../../models/response');
const testId=require('../../routes/test');
const signupTest=require('../../models/signup');
const Promise=require('promise');
const questionTest=require('../../models/model');
const courseTest=require('../../models/courses');

function dataGathererService(testidx){
    return new Promise(function(resolve, reject) {
      console.log('testid in pdf',testidx);
      responseTest.find({testId: testidx},function(err,obj){
        let finalobj={};
            if(err){
                console.log(err);
            }
            else{
              // console.log(obj);
              // for(let j=0;j<obj.length;j++){
              //   if(obj[j].testId===testidx){
              //     finalobj.responseobj=obj[j];
              //     console.log(finalobj);
              //     console.log('this is a test->',obj[j]);
              //     break;
              //   }
              // }
              console.log(' in pdf module responseobj',obj[0],'\n\nobj',obj);
              finalobj.responseobj = obj[0];
              questionTest.find({},function(e,o){
                var quearr = [];
                var comarr = [];
                var optionarr = [];
                console.log(o);
                if(e) {
                  console.log(e,'in questions');
                } else {
                  for(let k=0;k<finalobj.responseobj.qids.length;++k) {
                    for (let l of o) {
                        if(finalobj.responseobj.qids[k]===l.qid){
                          quearr.push(l.question);
                          comarr.push(l.comment[finalobj.responseobj.responses[k]]);
                          optionarr.push(l.options[finalobj.responseobj.responses[k]]);
                        }
                    }
                  }
                  finalobj.questionobj={question:quearr,comment:comarr,option:optionarr};
                }
              });
              signupTest.find({testId: testidx},function(err1,obj1){
                if(err1){
                    console.log(err1);
                }
                else {
                  // for(let j=0;j<obj1.length;j++){
                  //   if(obj1[j].testId===testidx){
                  //     finalobj.signupobj=obj1[j];
                  //     break;
                  //   }
                  // }
                  console.log(' in pdf module signupobj',obj1[0]);
                  finalobj.signupobj = obj1[0];
                  courseTest.find({},function(er,ob){
                    if(er){
                      console.log(er);
                    }else{
                      finalobj.courseobj=ob;
                      console.log('\n\n\ncourseobj in pdf m',ob);
                      console.log('finalobj',finalobj);
                      resolve(JSON.parse(JSON.stringify({finalobj:finalobj})));
                    }
                  });
                }
        });
       }
    });
    });
}
module.exports=dataGathererService;
