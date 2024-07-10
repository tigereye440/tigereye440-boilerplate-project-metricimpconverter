```
  ConvertHandler class for converting between units
```
function ConvertHandler() {
  
  // Function for getting the number from user input
  this.getNum = function(input) {

    // Unit regex
    const alpha = /[a-zA-z]/

    // Get number from input using unit regex
    let num = (input.split(alpha)[0]).toString();

    // Get all division signs if any
    const bars = num.match(/\//g);

    // Number has at least one division sign
    if (bars != null) {
      // More than 1 division sign is present, invalid input throw an error
      if (bars.length > 1) throw new Error('invalid number');
    }

    // No number value in input, default to 1
    if (num === "") num = '1';

    // Evaluate num to get conversion value
    result = eval(num);

    // Number evaluation failed, throw an error
    if (isNaN(result)) throw new Error('invalid number');
    
    // Return result (num)
    return result;
  };
  
  // Function for getting the unit from user input
  this.getUnit = function(input) {
    // Unit regex
    const unitRegex = /[a-zA-z]*$/

    // Get unit from input
    const unit = input.match(unitRegex);

    // Units array for determining valid units
    const units = ['gal', 'mi', 'lbs', 'l', 'km', 'kg'];

    // Convert unit to lower case
    const formattedUnit = unit[0].toLowerCase()

    // Unit not found in units array, invalid unit throw an error
    if (!units.includes(formattedUnit)) {
      throw new Error('invalid unit');
    }  

    // Set result to formattedUnit
    let result = formattedUnit;
  
    // return result in lowercase except it is equal to 'l' then return in uppercase
    return result === 'l' ? result.toUpperCase() : result;
  };


  // Function for getting unit to convert to
  this.getReturnUnit = function(initUnit) {

    // Units object mapping units to their conversion counterpart
    const units = {
      gal: 'l',
      mi: 'km',
      lbs: 'kg',
      l: 'gal',
      km: 'mi',
      kg: 'lbs'
    }


    // Get the return unit of specified unit 
    let result = units[initUnit.toLowerCase()];

    // Return result in lowercase except it it equal to 'l' then return in uppercase
    return result === 'l' ? result.toUpperCase() : result;
  };


  // Get full name of units
  this.spellOutUnit = function(unit) {

    // fullUnit name object mapping units to their full names
    const fullUnitName = {
      gal: 'gallons',
      mi: 'miles',
      lbs: 'pounds',
      l: 'liters',
      kg: 'kilograms',
      km: 'kilometers'
    }

    // Get the full name of specified unit
    let result = fullUnitName[unit.toLowerCase()];

    // Return result
    return result;
  };
  
  // Function for converting between units
  this.convert = function(initNum, initUnit) {
    // Conversion rates
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;

    // Dealing with each case
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
    
    // Result is NaN, invalid number throw an error
    if (isNaN(result)) {
        throw new Error('Invalid number');
    }
    
    // Return result as a number to 5 decimal places
    return Number(result.toFixed(5));
};
  
  // Build  return string from values
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
