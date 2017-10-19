const Fraction = require('fraction.js');
// const n2f = require('num2fraction')


function numberParts(x: number, radix: number) {
  let exp = 0;
  let sgn = 0;

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
    mantissa: x,
    exponent: exp,
  };
}

function whatDecimalSeparator() {
  const n = 1.1;
  const localString = /^1(.+)1$/.exec(n.toLocaleString());
  if (localString && localString.length > 1) {
    return localString[1];
  } else {
    return null;
  }
}

function extractSignificant(x: number) {
  const decimalDelimiter = whatDecimalSeparator() || '.';
  let xx = Math.abs(x);
  xx
  while (Math.abs(xx) > 0 && Math.abs(xx) < 1) {
    xx *= 10;
  }
  xx
  if (Math.abs(xx).toString(10) !== '0') {
    while (xx.toString(10)[xx.toString(10).length - 1] === '0') {
      xx /= 10;
    }
  }
  xx

  console.log('extracting from this string '+ xx.toString(10));
  const intDec = xx.toString(10).split(decimalDelimiter);
  const int = intDec[0];
  const dec = intDec[1];
  int
  dec
  const ret = (/^[0-9]*$/.exec((int || '') + (dec || '')) || [''])[0];
  ret
  let temp = ret.replace(/0000000+[1-9]/,'')
temp
    
  return temp;
}

function roundNumberToHalfItsSignificantLengthUsingSplit(numberToRound: number) {
  console.log('');
  console.log('IN======> : ' + numberToRound);
  let flipper = 1;
  let frontNumberDigitsToRoundTo = 0;
  let rnum = parseFloat(numberToRound.toFixed(6));
  const x = new Fraction(rnum);
  x
  // const x = n2f(numberToRound);
  // const fradec = x.valueOf();
  rnum = x.valueOf();
  rnum;
  
  const parts = numberParts(rnum / 10, 10);
  parts.mantissa = parseInt(extractSignificant(rnum), 10);
  console.log('parts.mantissa : ' + parts.mantissa);

  const mantissaLength = parts.mantissa.toString(10).length;

  frontNumberDigitsToRoundTo = Math.ceil(mantissaLength / 2);

  console.log('mantissaLength: ' + mantissaLength);
  console.log('frontNumberDigitsToRoundTo ' + frontNumberDigitsToRoundTo);
  console.log('parts.mantissa.toString(10) ' + parts.mantissa.toString(10));
  if (frontNumberDigitsToRoundTo === void 0) {
    frontNumberDigitsToRoundTo = 2;
  }
  if (frontNumberDigitsToRoundTo < 0) {
    frontNumberDigitsToRoundTo = 0;
  }
  // rnum *= 1.1; // give us always 10%
  if (rnum < 0) {
    flipper = -1;
    rnum *= flipper;
  }

  const rlength = -1 * (parts.exponent - (frontNumberDigitsToRoundTo -2));
  const newNumber = flipper * Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);

  console.log('OUT=======> ' + newNumber);
  return newNumber;
}

function myOutput2(things: string) {
  console.log(things);
}
let t1 = 0.1+0.2
t1

let res = roundNumberToHalfItsSignificantLengthUsingSplit(0.00009);
res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-10000000100000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-1000000010000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-100000001000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-10000000100);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-1000000010);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-100000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-99999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-10000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-9999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-1000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-100001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-99999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-10001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-9999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-1001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-101);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-99);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-9);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(-1);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.26);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.02322);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.01);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.011111);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.0001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.00099999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.0009);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.01);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.09);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.1);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(9);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(99);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(101);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(909);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(9999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(10001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(99999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(100001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(9999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(10000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(99999999);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(100000001);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1000000010);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(10000000100);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(100000001000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1000000010000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(10000000100000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(100000001000000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(1000000010000000);
// res;
// res = roundNumberToHalfItsSignificantLengthUsingSplit(0.02);
// res;

console.log('You use "' + whatDecimalSeparator() + '" as Decimal seprator');
