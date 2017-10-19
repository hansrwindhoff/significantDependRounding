import * as Fraction from 'fraction.js'


function getLastIntegerDigit(num: number) {
  const numString = num.toString();
  
  if (numString.length > 1) {
    const lastDigString = numString[numString.length - 1];
    lastDigString;
    const lastDig = parseInt(lastDigString);
    return lastDig;
  } else {
    return 0;
  }
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

// defaults the position to half the significant length
function roundUpAtSignificantPosition(num: number, position?: number) {
  const decimalDelimiter = whatDecimalSeparator() || '.';
  
  num;
  let numFrac = new Fraction(num);
  numFrac;

  
  let rounded = 42;
  let counter = 0;
  let flipper = 1;
  if (num < 0) {
    flipper = -1;
  }
  
  numFrac = numFrac.abs();
  if (numFrac.valueOf() < 1) {
    while (numFrac.valueOf() < 1) {
      numFrac = numFrac.mul(10);
      counter++;
    }
  } else if (numFrac.valueOf() >= 10) {
    while (numFrac.valueOf() >= 10) {
      numFrac = numFrac.div(10);
      counter--;
    }
  }
  // number is now x.xxxx...
  if (!position) {
    numFrac
    let intDec = numFrac.valueOf()
    intDec 
    intDec = intDec.toString().split(decimalDelimiter);
    intDec
    const int = intDec[0];
    const dec = (/^[0-9]*$/.exec(intDec[1])) ;
    int;
    dec;
    const significant = (/^[0-9]*$/.exec((int || '') + (dec || '')) || [''])[0];
    significant
    position = parseInt((significant.toString().length / 2).toString());
    position
  }
  position;
  
  numFrac = numFrac.mul(Fraction(10).pow(position));
  numFrac = numFrac.add(1); // always round up at the position selected
  numFrac = numFrac.round(); // chop of any trailing digits
  // and we want a traling zero,
  const lastDig = getLastIntegerDigit(numFrac.valueOf());
  lastDig;
  if (lastDig) {
    // unless we already have one
    numFrac = numFrac.add(10 - lastDig);
  }
  numFrac = numFrac.mul(Fraction(10).pow(-(counter + position))).mul(flipper);
  numFrac;
  const fracVal = numFrac.valueOf();
  fracVal;
  rounded = fracVal;
  rounded;
  return rounded;
}










let theNum = 0.1 + 0.2 ;
theNum
let result;
theNum *= 1.1;
theNum;
result = roundUpAtSignificantPosition(theNum);
result;

result = roundUpAtSignificantPosition(10010);
result;
result = roundUpAtSignificantPosition(112411);
result;
result = roundUpAtSignificantPosition(10000, 0);
result;
result = roundUpAtSignificantPosition(10000, 4);
result;
result = roundUpAtSignificantPosition(10000, 5);
result;
result = roundUpAtSignificantPosition(10000);
result;
result = roundUpAtSignificantPosition(-10000);
result;
result = roundUpAtSignificantPosition(-10000, 1);
result;
result = roundUpAtSignificantPosition(-10000, 2);
result;
result = roundUpAtSignificantPosition(-10000, 3);
result;
result = roundUpAtSignificantPosition(-10000, 4);
result;

result = roundUpAtSignificantPosition(0.004);
result;
result = roundUpAtSignificantPosition(0.004, 2);
result;
result = roundUpAtSignificantPosition(0.004, 3);
result;
result = roundUpAtSignificantPosition(0.004, 4);
result;
result = roundUpAtSignificantPosition(0.004, 5);
result;
result = roundUpAtSignificantPosition(0.004, 6);
result;
result = roundUpAtSignificantPosition(-0.004);
result;
result = roundUpAtSignificantPosition(-0.0044, 3);
result;
result = roundUpAtSignificantPosition(-0.004, 3);
result;
result = roundUpAtSignificantPosition(-0.004, 4);
result;
result = roundUpAtSignificantPosition(-0.004, 5);
result;

result = roundUpAtSignificantPosition(99);
result;
result = roundUpAtSignificantPosition(29);
result;
result = roundUpAtSignificantPosition(29,3);
result;
result = roundUpAtSignificantPosition(10000,4);
result;
result = roundUpAtSignificantPosition(10000, -1);
result;
result = roundUpAtSignificantPosition(1);
result;

result = roundUpAtSignificantPosition(1);
result;

result = roundUpAtSignificantPosition(1000.090999,3);
result;
result = roundUpAtSignificantPosition(1000.090999,4);
result;
result = roundUpAtSignificantPosition(1000.09099999292929,1);
result;
result = roundUpAtSignificantPosition(1000.099);
result;
