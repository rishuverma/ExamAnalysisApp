var dataGathererService = require('./dataGathererModule/dataGathererService');
var htmlGenerator = require('./pdfTemplate/htmlGenerator');
var generatePDF = require('./pdfGenerator/pdfGenerator');
const testId=require('../routes/test');
const path=require('path');

function pdfGeneratorService(testid){

    var templateFile = path.join(path.join(__dirname,'../'),'/views/answer.ejs');
    var outputFile = './'+testid +'.pdf';
    return dataGathererService(testid).then(function (data) {
        return htmlGenerator(templateFile, data);
      }).then(function (html) {
        return generatePDF(html, outputFile);
      }).then(function (success) {
        console.log('PDF generation successful at ' + outputFile);
        return success;
      }).catch(function (err) {
        console.log('ERROR in PDF generation : ' + err);
        return false;
      });
}



module.exports = pdfGeneratorService;
