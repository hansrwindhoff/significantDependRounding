'use strict';
function numberParts(x, radix) {
  var exp = 0;
  var sgn = 0;
  if (x === Number.NEGATIVE_INFINITY) {
    x = -9999999999999999999999;
  }
  if (x === Number.POSITIVE_INFINITY) {
    x = 9999999999999999999999;
  }
  if (typeof x === 'number' && x !== Number.NEGATIVE_INFINITY && x !== Number.POSITIVE_INFINITY) {
    if (x < 0) {
      sgn = 1;
      x = -x;
    }
    while (x > radix) {
      x /= radix;
      exp++;
    }
    while (x < 1 && x !== 0) {
      x *= radix;
      exp--;
    }
  }
  return {
    sign: sgn,
    Significant: x,
    exponent: exp,
  };
}
function roundNumberToHalfItsSignificantLengthUsingSplit(rnum) {
  console.log('');
  console.log('Input ========================================================> : ' + rnum);
  var flipper = 1;
  var frontNumberDigitsToRoundTo = 0;
  var parts = numberParts(rnum / 10, 10);
  parts.Significant = parseInt(extractSignificant(rnum), 10);
  var SignificantLength = parts.Significant.toString(10).length;
  frontNumberDigitsToRoundTo = Math.ceil(SignificantLength / 2);
  console.log('SignificantLength: ' + SignificantLength);
  console.log('frontNumberDigitsToRoundTo ' + frontNumberDigitsToRoundTo);
  if (frontNumberDigitsToRoundTo === void 0) {
    frontNumberDigitsToRoundTo = 2;
  }
  if (frontNumberDigitsToRoundTo < 0) {
    frontNumberDigitsToRoundTo = 0;
  }
  rnum *= 1.1; // give us always 10%
  if (rnum < 0) {
    flipper = -1;
    rnum *= flipper;
  }
  var rlength = -1 * (parts.exponent - (frontNumberDigitsToRoundTo - 2));
  var newnumber = flipper * Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  console.log('===============================================> ' + newnumber);
  return newnumber;
}
function extractSignificant(x) {
  var decimalDelimiter = '.';
  var xx = Math.abs(x);
  while (Math.abs(xx) > 0 && Math.abs(xx) < 1) {
    xx *= 10;
  }
  if (Math.abs(xx).toString(10) !== '0') {
    while (xx.toString(10)[xx.toString(10).length - 1] === '0') {
      xx /= 10;
    }
  }
  var intDec = xx.toString(10).split(decimalDelimiter);
  var int = intDec[0];
  var dec = intDec[1];
  return (/^[0-9]*$/.exec((int || '') + (dec || '')) || [''])[0];
}
function myOutput2(things) {
  console.log(things);
}
roundNumberToHalfItsSignificantLengthUsingSplit(-10000000100000);
roundNumberToHalfItsSignificantLengthUsingSplit(-1000000010000);
roundNumberToHalfItsSignificantLengthUsingSplit(-100000001000);
roundNumberToHalfItsSignificantLengthUsingSplit(-10000000100);
roundNumberToHalfItsSignificantLengthUsingSplit(-1000000010);
roundNumberToHalfItsSignificantLengthUsingSplit(-100000001);
roundNumberToHalfItsSignificantLengthUsingSplit(-99999999);
roundNumberToHalfItsSignificantLengthUsingSplit(-10000001);
roundNumberToHalfItsSignificantLengthUsingSplit(-9999999);
roundNumberToHalfItsSignificantLengthUsingSplit(-1000001);
roundNumberToHalfItsSignificantLengthUsingSplit(-999999);
roundNumberToHalfItsSignificantLengthUsingSplit(-100001);
roundNumberToHalfItsSignificantLengthUsingSplit(-99999);
roundNumberToHalfItsSignificantLengthUsingSplit(-10001);
roundNumberToHalfItsSignificantLengthUsingSplit(-9999);
roundNumberToHalfItsSignificantLengthUsingSplit(-1001);
roundNumberToHalfItsSignificantLengthUsingSplit(-999);
roundNumberToHalfItsSignificantLengthUsingSplit(-101);
roundNumberToHalfItsSignificantLengthUsingSplit(-99);
roundNumberToHalfItsSignificantLengthUsingSplit(-9);
roundNumberToHalfItsSignificantLengthUsingSplit(-1);
roundNumberToHalfItsSignificantLengthUsingSplit(0.1);
roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
roundNumberToHalfItsSignificantLengthUsingSplit(0.01);
roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
roundNumberToHalfItsSignificantLengthUsingSplit(0.001);
roundNumberToHalfItsSignificantLengthUsingSplit(0.0009);
roundNumberToHalfItsSignificantLengthUsingSplit(0);
roundNumberToHalfItsSignificantLengthUsingSplit(0.0009);
roundNumberToHalfItsSignificantLengthUsingSplit(0.001);
roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
roundNumberToHalfItsSignificantLengthUsingSplit(0.01);
roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
roundNumberToHalfItsSignificantLengthUsingSplit(0.1);
roundNumberToHalfItsSignificantLengthUsingSplit(1);
roundNumberToHalfItsSignificantLengthUsingSplit(9);
roundNumberToHalfItsSignificantLengthUsingSplit(99);
roundNumberToHalfItsSignificantLengthUsingSplit(101);
roundNumberToHalfItsSignificantLengthUsingSplit(909);
roundNumberToHalfItsSignificantLengthUsingSplit(1001);
roundNumberToHalfItsSignificantLengthUsingSplit(9999);
roundNumberToHalfItsSignificantLengthUsingSplit(10001);
roundNumberToHalfItsSignificantLengthUsingSplit(99999);
roundNumberToHalfItsSignificantLengthUsingSplit(100001);
roundNumberToHalfItsSignificantLengthUsingSplit(999999);
roundNumberToHalfItsSignificantLengthUsingSplit(1000001);
roundNumberToHalfItsSignificantLengthUsingSplit(9999999);
roundNumberToHalfItsSignificantLengthUsingSplit(10000001);
roundNumberToHalfItsSignificantLengthUsingSplit(99999999);
roundNumberToHalfItsSignificantLengthUsingSplit(100000001);
roundNumberToHalfItsSignificantLengthUsingSplit(1000000010);
roundNumberToHalfItsSignificantLengthUsingSplit(10000000100);
roundNumberToHalfItsSignificantLengthUsingSplit(100000001000);
roundNumberToHalfItsSignificantLengthUsingSplit(1000000010000);
roundNumberToHalfItsSignificantLengthUsingSplit(10000000100000);
roundNumberToHalfItsSignificantLengthUsingSplit(100000001000000);
roundNumberToHalfItsSignificantLengthUsingSplit(1000000010000000);
roundNumberToHalfItsSignificantLengthUsingSplit(0.02);
