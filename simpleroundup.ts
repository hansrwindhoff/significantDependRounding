import * as Fraction from 'fraction.js';



function getLastIntegerDigit(theNumber: number) {
  const numString = theNumber.toString();
  if (numString.length > 1) {
    const lastDigString = numString[numString.length - 1];
    lastDigString;
    const lastDig = parseInt(lastDigString, 10);
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

function transformIntoXdotxxxForm(
  fractionalRepresentationParameter: any,
  shiftCounterParameter: number,
) {
  let shiftCounter = shiftCounterParameter;
  let fractionalRepresentationTransformed = fractionalRepresentationParameter;
  fractionalRepresentationTransformed = fractionalRepresentationTransformed.abs();
  if (
    fractionalRepresentationTransformed.valueOf() < 1 &&
    fractionalRepresentationTransformed.valueOf() > 0
  ) {
    while (fractionalRepresentationTransformed.valueOf() < 1) {
      fractionalRepresentationTransformed = fractionalRepresentationTransformed.mul(10);
      shiftCounter += 1;
    }
  } else
    while (fractionalRepresentationTransformed.valueOf() >= 10) {
      fractionalRepresentationTransformed = fractionalRepresentationTransformed.div(10);
      shiftCounter -= 1;
    }
  // number is now x.xxxx... one interger digit
  return { fractionalRepresentationTransformed, shiftCounter };
}

function findPositionInSignificantIfUndefined(
  positionInSignificantParameter: number | undefined,
  fractionalRepresentation: any,
  fractionalRepresentationTransformed: any,
  decimalDelimiter: string,
) {
  let positionInSignificant = positionInSignificantParameter;

  if (!positionInSignificant) {
    const decimalRepresentationTransformed = fractionalRepresentationTransformed.valueOf();
    const decimalRepresentation = fractionalRepresentation.abs().valueOf();
    decimalRepresentation
    const decimalRepresentationTransformedParts: string[] = decimalRepresentationTransformed
      .toString()
      .split(decimalDelimiter);
    const decimalRepresentationParts: string[] = decimalRepresentation
      .toString()
      .split(decimalDelimiter);

    const integerPartTransformed = decimalRepresentationTransformedParts[0];
    const decimalPartTransformed = /^[0-9]*$/.exec(decimalRepresentationTransformedParts[1]);
    const integerPart = decimalRepresentationParts[0];
    decimalRepresentationParts
    const decimalPart = /^[0-9]*$/.exec(decimalRepresentationParts[1]);
    decimalPart
    
    const significant = (/^[0-9]*$/.exec(
      (integerPartTransformed || '') + (decimalPartTransformed || ''),
    ) || [''])[0];
    significant
    console.log(  integerPart.length)
    integerPart
    if (integerPart !== '0' && integerPart.length === 1) {
      // the original number
      positionInSignificant = 2;
    } else if (integerPart !== '0' && integerPart.length > 1) {
      // the original number
      positionInSignificant = parseInt((significant.toString().length / 2).toString(), 10);
      positionInSignificant
    } else {
      decimalRepresentation
      if (decimalRepresentation >= 0.01 && decimalRepresentation < 0.09 ) {
        positionInSignificant = -1;
      } else if (decimalRepresentation >= 0.09){
        positionInSignificant = 1;
      } else {
      positionInSignificant = parseInt((significant.toString().length / 2).toString(), 10);
    }
  }
    // fuse
    if (positionInSignificant > 3) {
      // force to the 1/100
      positionInSignificant = 2;
    }
  }
  positionInSignificant
  return positionInSignificant;
}

function roundItUp(fractionalRepresentationParameter: any, positionInSignificant: number) {
  let fractionalRepresentation = fractionalRepresentationParameter;
  fractionalRepresentation = fractionalRepresentation.mul(
    new Fraction(10).pow(positionInSignificant),
  );
  fractionalRepresentation = fractionalRepresentation.add(1); // always round up at the position selected
  fractionalRepresentation = fractionalRepresentation.round(); // chop of any trailing digits
  // and we want a traling zero,
  const lastIntergerDigit = getLastIntegerDigit(fractionalRepresentation.valueOf());
  if (lastIntergerDigit) {
    // unless we already have one
    fractionalRepresentation = fractionalRepresentation.add(10 - lastIntergerDigit);
  }
  return fractionalRepresentation;
}

function reverseMagnitudeTransforms(
  fractionalRepresentationParameter: any,
  shiftCounter: number,
  positionInSignificant: number,
  signFlipper: number,
) {
  let fractionalRepresentation = fractionalRepresentationParameter;
  fractionalRepresentation = fractionalRepresentation
    .mul(new Fraction(10).pow(-(shiftCounter + positionInSignificant)))
    .mul(signFlipper);
  fractionalRepresentation;
  const roundedResult = fractionalRepresentation.valueOf();
  return { fractionalRepresentation, roundedResult };
}

// defaults the position to half the significant length
function roundNumberToHalfItsSignificantLength(
  theNumberToBeRounded: number,
  positionInSignificantParameter?: number,
) {
  let positionInSignificant = positionInSignificantParameter;
  const decimalDelimiter = whatDecimalSeparator() || '.';
  console.log('INPUT =======> ' + theNumberToBeRounded);
  try {
    let fractionalRepresentationTransformed: any;
    let fractionalRepresentation = new Fraction(theNumberToBeRounded);

    let roundedResult = 42;
    let shiftCounter = 0;
    let signFlipper = 1;
    if (theNumberToBeRounded < 0) {
      signFlipper = -1;
    }

    ({ fractionalRepresentationTransformed, shiftCounter } = transformIntoXdotxxxForm(
      fractionalRepresentation,
      shiftCounter,
    ));

    positionInSignificant = findPositionInSignificantIfUndefined(
      positionInSignificant,
      fractionalRepresentation,
      fractionalRepresentationTransformed,
      decimalDelimiter,
    );

    fractionalRepresentationTransformed = roundItUp(
      fractionalRepresentationTransformed,
      positionInSignificant,
    );

    ({ fractionalRepresentation, roundedResult } = reverseMagnitudeTransforms(
      fractionalRepresentationTransformed,
      shiftCounter,
      positionInSignificant,
      signFlipper,
    ));
    console.log('OUTPUT =======> ' + roundedResult);
    return roundedResult;
  } catch (error) {
    throw new Error('roundNumberToHalfItsSignificantLength had an error: ' + error);
  }
}

export default roundNumberToHalfItsSignificantLength;



function increaseByPercent(theNumber:number, percent: number) {
  const tempNum = theNumber * (1+(percent/100.0))* (1+(percent/100.0)) ;
  tempNum
  return tempNum;
} 



// test cases
let result;

// result = roundNumberToHalfItsSignificantLength( increaseByPercent(1228797.32,10));
// result;
// result = roundNumberToHalfItsSignificantLength(increaseByPercent(5.19,0));
// result;
// result = roundNumberToHalfItsSignificantLength(increaseByPercent( 3823.20,0));
// result;
// result = roundNumberToHalfItsSignificantLength(increaseByPercent( 1118640,0));
// result;

// result = roundNumberToHalfItsSignificantLength(increaseByPercent( 736320,0));
// result;
// result = roundNumberToHalfItsSignificantLength(0.01);
// result;
// result = roundNumberToHalfItsSignificantLength(0.09);
// result;
// result = roundNumberToHalfItsSignificantLength(0.1);
// result;
// result = roundNumberToHalfItsSignificantLength(0.19);
// result;
// result = roundNumberToHalfItsSignificantLength(0.9);
// result;
// result = roundNumberToHalfItsSignificantLength(0.89);
// result;
result = roundNumberToHalfItsSignificantLength(12);
result;




// let theNum = 0.1 + 0.2 ;
// theNum
// theNum *= 1.1;
// theNum;
// result = roundNumberToHalfItsSignificantLength(theNum);
// result;

// result = roundNumberToHalfItsSignificantLength(10010);
// result;
// result = roundNumberToHalfItsSignificantLength(112411);
// result;
// result = roundNumberToHalfItsSignificantLength(10000, 0);
// result;
// result = roundNumberToHalfItsSignificantLength(10000, 4);
// result;
// result = roundNumberToHalfItsSignificantLength(10000, 5);
// result;
// result = roundNumberToHalfItsSignificantLength(10000);
// result;
// result = roundNumberToHalfItsSignificantLength(-10000);
// result;
// result = roundNumberToHalfItsSignificantLength(-10000, 1);
// result;
// result = roundNumberToHalfItsSignificantLength(-10000, 2);
// result;
// result = roundNumberToHalfItsSignificantLength(-10000, 3);
// result;
// result = roundNumberToHalfItsSignificantLength(-10000, 4);
// result;

// result = roundNumberToHalfItsSignificantLength(0.004);
// result;
// result = roundNumberToHalfItsSignificantLength(0.004, 2);
// result;
// result = roundNumberToHalfItsSignificantLength(0.004, 3);
// result;
// result = roundNumberToHalfItsSignificantLength(0.004, 4);
// result;
// result = roundNumberToHalfItsSignificantLength(0.004, 5);
// result;
// result = roundNumberToHalfItsSignificantLength(0.004, 6);
// result;
// result = roundNumberToHalfItsSignificantLength(-0.004);
// result;
// result = roundNumberToHalfItsSignificantLength(-0.0044, 3);
// result;
// result = roundNumberToHalfItsSignificantLength(-0.004, 3);
// result;
// result = roundNumberToHalfItsSignificantLength(-0.004, 4);
// result;
// result = roundNumberToHalfItsSignificantLength(-0.004, 5);
// result;

// result = roundNumberToHalfItsSignificantLength(99);
// result;
// result = roundNumberToHalfItsSignificantLength(29);
// result;
// result = roundNumberToHalfItsSignificantLength(29,3);
// result;
// result = roundNumberToHalfItsSignificantLength(10000,4);
// result;
// result = roundNumberToHalfItsSignificantLength(10000, -1);
// result;
// result = roundNumberToHalfItsSignificantLength(1);
// result;

// result = roundNumberToHalfItsSignificantLength(1);
// result;

// result = roundNumberToHalfItsSignificantLength(1000.090999,3);
// result;
// result = roundNumberToHalfItsSignificantLength(1000.090999,4);
// result;
// result = roundNumberToHalfItsSignificantLength(1000.09099999292929,1);
// result;
// result = roundNumberToHalfItsSignificantLength(1000.099);
// result;
