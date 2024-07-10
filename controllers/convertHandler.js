function ConvertHandler() {
  
  this.getNum = function(input) {
    const alpha = /[a-zA-z]/

    let num = (input.split(alpha)[0]).toString();
    const bars = num.match(/\//g);
    if (bars != null) {
      if (bars.length > 1) throw new Error('invalid number');
    }

    if (num === "") num = '1';

    result = eval(num);
    if (isNaN(result)) throw new Error('invalid number');
    
    return result;
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-z]*$/
    const unit = input.match(unitRegex);
    const units = ['gal', 'mi', 'lbs', 'L', 'km', 'kg'];

    if (!units.includes(unit[0])) {
      throw new Error('invalid unit');
    }  
    let result = unit[0];
  
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: 'L',
      mi: 'km',
      lbs: 'kg',
      L: 'gal',
      km: 'mi',
      kg: 'lbs'
    }

    let result = units[initUnit];
    return result
  };

  this.spellOutUnit = function(unit) {
    const fullUnitName = {
      gal: 'gallons',
      mi: 'miles',
      lbs: 'pounds',
      L: 'liters',
      kg: 'kilograms',
      km: 'kilometers'
    }

    let result = fullUnitName[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        throw new Error(`Invalid unit ${initUnit}`);
    }
    
    if (isNaN(result)) {
        throw new Error('Invalid number');
    }
    
    return result.toFixed(5);
};
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
