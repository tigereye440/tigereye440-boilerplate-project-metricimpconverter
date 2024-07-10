const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number', function() {
        assert.isNumber(convertHandler.getNum('12 kg'), 'should return 12');
    });

    test('should correctly read a decimal number', function() {
        assert.isNumber(convertHandler.getNum('1.1 kg'), '1.1 was read correctly ');
    });

    test('should correctly read a fractional input', function() {
        assert.isNumber(convertHandler.getNum('2/4 kg'), '2/4 was read correclty');
    });

    test('should correctly read a fractional input with a decimal', function() {
        assert.isNumber(convertHandler.getNum('3/2.4 kg'), '3/2.4 was read correctly');
    });

    test('should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
        assert.throws(() => {convertHandler.getNum('3/2/3 kg')}, Error, 'invalid number');
    });

    test(' should correctly default to a numerical input of 1 when no numerical input is provided', 
        function() {
            assert.equal(convertHandler.getNum('kg'), 1, 'defaulted to 1');
        }
    );

    test('should correctly read each valid input unit', function() {
        const units = ['gal', 'mi', 'lbs', 'L', 'km', 'kg'];
            for (const unit of units) {
                const input = '12' + unit;
                assert.equal(convertHandler.getUnit(input), unit, `should read unit: ${unit} correclty `)
            } 
    });

    test('should correctly return an error for an invalid input unit.', function() {
        assert.throws(() => {convertHandler.getUnit('12mal')}, Error, 'invalid unit');
    });

    test('should return the correct return unit for each valid input unit', function() {
        const units = ['gal', 'mi', 'lbs', 'L', 'km', 'kg'];
        const returnUnits = {
            gal: 'L',
            mi: 'km',
            lbs: 'kg',
            L: 'gal',
            km: 'mi',
            kg: 'lbs'
          }
            for (const unit of units) {
                assert.equal(convertHandler.getReturnUnit(unit), returnUnits[unit], `${unit} should return ${returnUnits[unit]}`)
            } 
    });

    test('should correctly return the spelled-out string unit for each valid input unit', function() {
        const units = ['gal', 'mi', 'lbs', 'L', 'km', 'kg'];
        const fullUnitName = {
            gal: 'gallons',
            mi: 'miles',
            lbs: 'pounds',
            L: 'liters',
            kg: 'kilograms',
            km: 'kilometers'
          }
          for (const unit of units) {
            assert.equal(convertHandler.spellOutUnit(unit), fullUnitName[unit], `${unit} should return ${fullUnitName[unit]}`)
        } 
    });

    test('should correctly convert gal to L', function() {
        assert.equal(convertHandler.convert(12, 'gal'), 45.42492, '12gal shoud convert to 45.42492L')
    });

    test('should correctly convert L to gal', function() {
        assert.equal(convertHandler.convert(12, 'L'), 3.17007, '12L should convert to 3.17007gal');
    });

    test('should correctly convert mi to km', function() {
        assert.equal(convertHandler.convert(12, 'mi'), 19.31208, '12mi should convert to 19.31208km' );
    });

    test('should correctly convert km to mi', function() {
        assert.equal(convertHandler.convert(12, 'km'), 7.45647, '12km should convert to 19.7.45647mi' );
    });

    test('should correctly convert lbs to kg', function() {
        assert.equal(convertHandler.convert(12, 'lbs'), 5.44310, '12lbs should convert to 5.44310');
    });

    test('should correctly convert kg to lbs', function() {
        assert.equal(convertHandler.convert(12, 'kg'), 26.45549, '12kg should convert to 26.45549');
    });
    

});
