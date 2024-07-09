'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  

  app.route('/api/convert').get((req, res) => {

    const input = req.query.input;
    const converter = new ConvertHandler();

    let initUnit;
    let initNum;
    let errs = [];    

    try {
      initNum = converter.getNum(input);
    } catch (err) {
      console.log(err.message)
      errs.push(err);
    }

    try {
      initUnit = converter.getUnit(input); 
    } catch (err) {
      console.log(err.message)
      errs.push(err);
    }

    if (errs.length > 1) {
      res.json('invalid number and unit')
    } else if (errs.length == 1) {
      res.json(errs[0].message);
    }

    const returnNum = converter.convert(initNum, initUnit);
    const returnUnit = converter.getReturnUnit(initUnit);
    const returnStr = converter.getString(initNum, initUnit, returnNum, returnUnit);

    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: returnStr
    }
    
    res.json(result)
  })

};
