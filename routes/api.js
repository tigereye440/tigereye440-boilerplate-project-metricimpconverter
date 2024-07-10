'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  

  app.route('/api/convert').get((req, res) => {

    // Get input from url query
    const input = req.query.input;

    // Instantiate an instance of the ConvertHandler class
    const converter = new ConvertHandler();

    // Define variables
    let initUnit;
    let initNum;
    let errs = [];    

    try {
      // try getting the initNum from input
      initNum = converter.getNum(input);
    } catch (err) {

      // console.log(err.message)
      // if err push to errs 
      errs.push(err);
    }

    try {
      // try getting the initUnit from input
      initUnit = converter.getUnit(input); 
    } catch (err) {
      // console.log(err.message)
      // if err push to errs 
      errs.push(err);
    }

    // Check if there were errors
    if (errs.length > 1) {

      // Respond with error text
      res.json('invalid number and unit')
    } else if (errs.length == 1) {
      res.json(errs[0].message);
    }

    // Get conversion values
    const returnNum = converter.convert(initNum, initUnit);
    const returnUnit = converter.getReturnUnit(initUnit);
    const returnStr = converter.getString(initNum, initUnit, returnNum, returnUnit);

    // Build response string
    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: returnStr
    }
    
    // Return result
    res.json(result)
  })

};
