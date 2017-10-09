"use strict";
function getNumberPartsBin(x) {
    console.log(x + " ==> ");
    var float = new Float64Array(1), bytes = new Uint8Array(float.buffer);
    float[0] = x;
    var sign = bytes[7] >> 7, exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff;
    bytes[7] = 0x3f;
    bytes[6] |= 0xf0;
    console.log(float);
    return {
        sign: sign,
        exponent: exponent,
        mantissa: float[0],
    };
    // return float[0];
}
function myOutput(things) {
    console.log(things);
    console.log('===> ' + things.mantissa * Math.pow(2, things.exponent));
}
myOutput(getNumberPartsBin(-100000001));
myOutput(getNumberPartsBin(-99999999));
myOutput(getNumberPartsBin(-10000001));
myOutput(getNumberPartsBin(-9999999));
myOutput(getNumberPartsBin(-1000001));
myOutput(getNumberPartsBin(-999999));
myOutput(getNumberPartsBin(-100001));
myOutput(getNumberPartsBin(-99999));
myOutput(getNumberPartsBin(-10001));
myOutput(getNumberPartsBin(-9999));
myOutput(getNumberPartsBin(-1001));
myOutput(getNumberPartsBin(-999));
myOutput(getNumberPartsBin(-101));
myOutput(getNumberPartsBin(-99));
myOutput(getNumberPartsBin(-9));
myOutput(getNumberPartsBin(-1));
myOutput(getNumberPartsBin(0.1));
myOutput(getNumberPartsBin(0.09));
myOutput(getNumberPartsBin(0.01));
myOutput(getNumberPartsBin(0.09));
myOutput(getNumberPartsBin(0.001));
myOutput(getNumberPartsBin(0.0009));
myOutput(getNumberPartsBin(0));
myOutput(getNumberPartsBin(0.0009));
myOutput(getNumberPartsBin(0.001));
myOutput(getNumberPartsBin(0.09));
myOutput(getNumberPartsBin(0.01));
myOutput(getNumberPartsBin(0.09));
myOutput(getNumberPartsBin(0.1));
myOutput(getNumberPartsBin(1));
myOutput(getNumberPartsBin(9));
myOutput(getNumberPartsBin(99));
myOutput(getNumberPartsBin(101));
myOutput(getNumberPartsBin(909));
myOutput(getNumberPartsBin(1001));
myOutput(getNumberPartsBin(9999));
myOutput(getNumberPartsBin(10001));
myOutput(getNumberPartsBin(99999));
myOutput(getNumberPartsBin(100001));
myOutput(getNumberPartsBin(999999));
myOutput(getNumberPartsBin(1000001));
myOutput(getNumberPartsBin(9999999));
myOutput(getNumberPartsBin(10000001));
myOutput(getNumberPartsBin(99999999));
myOutput(getNumberPartsBin(100000001));
myOutput(getNumberPartsBin(0.02));
