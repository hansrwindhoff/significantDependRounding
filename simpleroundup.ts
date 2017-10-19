import * as Fraction from 'fraction.js'

function getLastIntegerDigit(theNumber: number) {
  const numString = theNumber.toString();  
  if (numString.length > 1) {
    const lastDigString = numString[numString.length - 1];
    lastDigString;
    const lastDig = parseInt(lastDigString);
    return lastDig;
  } else {
    return 0;
  }
}

// find the currently used decimal seperator, which depends on the locale of the environment
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
function roundUpAtSignificantPosition(theNumberToBeRounded: number, positionInSignificant?: number) {
  const decimalDelimiter = whatDecimalSeparator() || '.';
  
  theNumberToBeRounded;
  let fractionalRepresentation = new Fraction(theNumberToBeRounded);
  fractionalRepresentation;
  
  let roundedResult = 42;
  let shiftCounter = 0;
  let signFlipper = 1;
  if (theNumberToBeRounded < 0) {
    signFlipper = -1;
  }
  
  fractionalRepresentation = fractionalRepresentation.abs();
  if (fractionalRepresentation.valueOf() < 1) {
    while (fractionalRepresentation.valueOf() < 1) {
      fractionalRepresentation = fractionalRepresentation.mul(10);
      shiftCounter++;
    }
  } else if (fractionalRepresentation.valueOf() >= 10) {
    while (fractionalRepresentation.valueOf() >= 10) {
      fractionalRepresentation = fractionalRepresentation.div(10);
      shiftCounter--;
    }
  }
  // number is now x.xxxx...
  if (!positionInSignificant) {
    fractionalRepresentation
    let decimalRepresentation = fractionalRepresentation.valueOf()
    decimalRepresentation 
    const decimalRepresentationParts: string[] = decimalRepresentation.toString().split(decimalDelimiter);
    decimalRepresentationParts
    const integerPart = decimalRepresentationParts[0];
    const decimalPart = (/^[0-9]*$/.exec(decimalRepresentationParts[1])) ;
    integerPart;
    decimalPart;
    const significant = (/^[0-9]*$/.exec((integerPart || '') + (decimalPart || '')) || [''])[0];
    significant
    positionInSignificant = parseInt((significant.toString().length / 2).toString());
    positionInSignificant
  }
  positionInSignificant;
  
  fractionalRepresentation = fractionalRepresentation.mul(Fraction(10).pow(positionInSignificant));
  fractionalRepresentation = fractionalRepresentation.add(1); // always round up at the position selected
  fractionalRepresentation = fractionalRepresentation.round(); // chop of any trailing digits
  // and we want a traling zero,
  const lastIntergerDigit = getLastIntegerDigit(fractionalRepresentation.valueOf());
  lastIntergerDigit;
  if (lastIntergerDigit) {
    // unless we already have one
    fractionalRepresentation = fractionalRepresentation.add(10 - lastIntergerDigit);
  }
  fractionalRepresentation = fractionalRepresentation.mul(Fraction(10).pow(-(shiftCounter + positionInSignificant))).mul(signFlipper);
  fractionalRepresentation;
  roundedResult = fractionalRepresentation.valueOf();
  roundedResult;
  return roundedResult;
}








// test cases

let theNum = 0.1 + 0.2 ;
theNum
let result;
theNum *= 1.1;
theNum;
result = roundUpAtSignificantPosition(theNum);
result;

// result = roundUpAtSignificantPosition(10010);
// result;
// result = roundUpAtSignificantPosition(112411);
// result;
// result = roundUpAtSignificantPosition(10000, 0);
// result;
// result = roundUpAtSignificantPosition(10000, 4);
// result;
// result = roundUpAtSignificantPosition(10000, 5);
// result;
// result = roundUpAtSignificantPosition(10000);
// result;
// result = roundUpAtSignificantPosition(-10000);
// result;
// result = roundUpAtSignificantPosition(-10000, 1);
// result;
// result = roundUpAtSignificantPosition(-10000, 2);
// result;
// result = roundUpAtSignificantPosition(-10000, 3);
// result;
// result = roundUpAtSignificantPosition(-10000, 4);
// result;

// result = roundUpAtSignificantPosition(0.004);
// result;
// result = roundUpAtSignificantPosition(0.004, 2);
// result;
// result = roundUpAtSignificantPosition(0.004, 3);
// result;
// result = roundUpAtSignificantPosition(0.004, 4);
// result;
// result = roundUpAtSignificantPosition(0.004, 5);
// result;
// result = roundUpAtSignificantPosition(0.004, 6);
// result;
// result = roundUpAtSignificantPosition(-0.004);
// result;
// result = roundUpAtSignificantPosition(-0.0044, 3);
// result;
// result = roundUpAtSignificantPosition(-0.004, 3);
// result;
// result = roundUpAtSignificantPosition(-0.004, 4);
// result;
// result = roundUpAtSignificantPosition(-0.004, 5);
// result;

// result = roundUpAtSignificantPosition(99);
// result;
// result = roundUpAtSignificantPosition(29);
// result;
// result = roundUpAtSignificantPosition(29,3);
// result;
// result = roundUpAtSignificantPosition(10000,4);
// result;
// result = roundUpAtSignificantPosition(10000, -1);
// result;
// result = roundUpAtSignificantPosition(1);
// result;

// result = roundUpAtSignificantPosition(1);
// result;

// result = roundUpAtSignificantPosition(1000.090999,3);
// result;
// result = roundUpAtSignificantPosition(1000.090999,4);
// result;
// result = roundUpAtSignificantPosition(1000.09099999292929,1);
// result;
// result = roundUpAtSignificantPosition(1000.099);
// result;
