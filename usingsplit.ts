
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

function roundNumberToHalfItsMantissaLengthUsingSplit(rnum: number) {
  console.log('');
  console.log('========================================================> : ' + rnum);
  let flipper = 1;
  let frontNumberDigitsToRoundTo = 0;

  const parts = numberParts(rnum / 10, 10);
  parts.mantissa = parseInt(extractSignificant(rnum), 10);

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
  rnum *= 1.1; // give us always 10%
  if (rnum < 0) {
    flipper = -1;
    rnum *= flipper;
  }

  const rlength = -1 * (parts.exponent - (frontNumberDigitsToRoundTo - 2));
  const newnumber = flipper * Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);

  console.log('===============================================> ' + newnumber);
  return newnumber;
}

function extractSignificant(x: number) {
  const decimalDelimiter = '.';
  let xx = Math.abs(x);
  while (Math.abs(xx) > 0 && Math.abs(xx) < 1) {
    xx *= 10;
  }
  if (Math.abs(xx).toString(10) !== '0') {
    while (xx.toString(10)[xx.toString(10).length - 1] === '0') {
      xx /= 10;
    }
  }
  const intDec = xx.toString(10).split(decimalDelimiter);
  const int = intDec[0];
  const dec = intDec[1];
  return (/^[0-9]*$/.exec((int || '') + (dec || '')) || [''])[0];
}

function myOutput2(things: string) {
  console.log(things);
}

roundNumberToHalfItsMantissaLengthUsingSplit(-10000000100000);
roundNumberToHalfItsMantissaLengthUsingSplit(-1000000010000);
roundNumberToHalfItsMantissaLengthUsingSplit(-100000001000);
roundNumberToHalfItsMantissaLengthUsingSplit(-10000000100);
roundNumberToHalfItsMantissaLengthUsingSplit(-1000000010);
roundNumberToHalfItsMantissaLengthUsingSplit(-100000001);
roundNumberToHalfItsMantissaLengthUsingSplit(-99999999);
roundNumberToHalfItsMantissaLengthUsingSplit(-10000001);
roundNumberToHalfItsMantissaLengthUsingSplit(-9999999);
roundNumberToHalfItsMantissaLengthUsingSplit(-1000001);
roundNumberToHalfItsMantissaLengthUsingSplit(-999999);
roundNumberToHalfItsMantissaLengthUsingSplit(-100001);
roundNumberToHalfItsMantissaLengthUsingSplit(-99999);
roundNumberToHalfItsMantissaLengthUsingSplit(-10001);
roundNumberToHalfItsMantissaLengthUsingSplit(-9999);
roundNumberToHalfItsMantissaLengthUsingSplit(-1001);
roundNumberToHalfItsMantissaLengthUsingSplit(-999);
roundNumberToHalfItsMantissaLengthUsingSplit(-101);
roundNumberToHalfItsMantissaLengthUsingSplit(-99);
roundNumberToHalfItsMantissaLengthUsingSplit(-9);
roundNumberToHalfItsMantissaLengthUsingSplit(-1);
roundNumberToHalfItsMantissaLengthUsingSplit(0.1);
roundNumberToHalfItsMantissaLengthUsingSplit(0.09);
roundNumberToHalfItsMantissaLengthUsingSplit(0.01);
roundNumberToHalfItsMantissaLengthUsingSplit(0.09);
roundNumberToHalfItsMantissaLengthUsingSplit(0.001);
roundNumberToHalfItsMantissaLengthUsingSplit(0.0009);
roundNumberToHalfItsMantissaLengthUsingSplit(0);
roundNumberToHalfItsMantissaLengthUsingSplit(0.0009);
roundNumberToHalfItsMantissaLengthUsingSplit(0.001);
roundNumberToHalfItsMantissaLengthUsingSplit(0.09);
roundNumberToHalfItsMantissaLengthUsingSplit(0.01);
roundNumberToHalfItsMantissaLengthUsingSplit(0.09);
roundNumberToHalfItsMantissaLengthUsingSplit(0.1);
roundNumberToHalfItsMantissaLengthUsingSplit(1);
roundNumberToHalfItsMantissaLengthUsingSplit(9);
roundNumberToHalfItsMantissaLengthUsingSplit(99);
roundNumberToHalfItsMantissaLengthUsingSplit(101);
roundNumberToHalfItsMantissaLengthUsingSplit(909);
roundNumberToHalfItsMantissaLengthUsingSplit(1001);
roundNumberToHalfItsMantissaLengthUsingSplit(9999);
roundNumberToHalfItsMantissaLengthUsingSplit(10001);
roundNumberToHalfItsMantissaLengthUsingSplit(99999);
roundNumberToHalfItsMantissaLengthUsingSplit(100001);
roundNumberToHalfItsMantissaLengthUsingSplit(999999);
roundNumberToHalfItsMantissaLengthUsingSplit(1000001);
roundNumberToHalfItsMantissaLengthUsingSplit(9999999);
roundNumberToHalfItsMantissaLengthUsingSplit(10000001);
roundNumberToHalfItsMantissaLengthUsingSplit(99999999);
roundNumberToHalfItsMantissaLengthUsingSplit(100000001);
roundNumberToHalfItsMantissaLengthUsingSplit(1000000010);
roundNumberToHalfItsMantissaLengthUsingSplit(10000000100);
roundNumberToHalfItsMantissaLengthUsingSplit(100000001000);
roundNumberToHalfItsMantissaLengthUsingSplit(1000000010000);
roundNumberToHalfItsMantissaLengthUsingSplit(10000000100000);
roundNumberToHalfItsMantissaLengthUsingSplit(100000001000000);
roundNumberToHalfItsMantissaLengthUsingSplit(1000000010000000);
roundNumberToHalfItsMantissaLengthUsingSplit(0.02);


