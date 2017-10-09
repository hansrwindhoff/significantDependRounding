const re = {
  not_string: /[^s]/,
  not_bool: /[^t]/,
  not_type: /[^T]/,
  not_primitive: /[^v]/,
  number: /[diefg]/,
  numeric_arg: /[bcdiefguxX]/,
  json: /[j]/,
  not_json: /[^j]/,
  text: /^[^\x25]+/,
  modulo: /^\x25{2}/,
  placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
  key: /^([a-z_][a-z_\d]*)/i,
  key_access: /^\.([a-z_][a-z_\d]*)/i,
  index_access: /^\[(\d+)\]/,
  sign: /^[\+\-]/,
};

function sprintf(key: any) {
  // `arguments` is not an array, but should be fine for this call
  return sprintf_format(sprintf_parse(key), arguments)
}

function vsprintf(fmt: string, argv: any) {
  return sprintf.apply(null, [fmt].concat(argv || []));
}

function sprintf_format(parse_tree: any, argv: number[]) {
  var cursor = 1,
    tree_length = parse_tree.length,
    arg,
    output = '',
    i,
    k,
    ph,
    pad,
    pad_character,
    pad_length,
    is_positive,
    sign;
  for (i = 0; i < tree_length; i++) {
    if (typeof parse_tree[i] === 'string') {
      output += parse_tree[i];
    } else if (typeof parse_tree[i] === 'object') {
      ph = parse_tree[i]; // convenience purposes only
      if (ph.keys) {
        // keyword argument
        arg = argv[cursor];
        for (k = 0; k < ph.keys.length; k++) {
          if (!arg.hasOwnProperty(ph.keys[k])) {
            throw new Error(sprintf('[sprintf] property "%s" does not exist', ph.keys[k]));
          }
          arg = arg[ph.keys[k]];
        }
      } else if (ph.param_no) {
        // positional argument (explicit)
        arg = argv[ph.param_no];
      } else {
        // positional argument (implicit)
        arg = argv[cursor++];
      }

      if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
        arg = arg();
      }

      if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
        throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg));
      }

      if (re.number.test(ph.type)) {
        is_positive = arg >= 0;
      }

      switch (ph.type) {
        case 'b':
          arg = parseInt(arg, 10).toString(2);
          break;
        case 'c':
          arg = String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd':
        case 'i':
          arg = parseInt(arg, 10);
          break;
        case 'j':
          arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
          break;
        case 'e':
          arg = ph.precision
            ? parseFloat(arg).toExponential(ph.precision)
            : parseFloat(arg).toExponential();
          break;
        case 'f':
          arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
          break;
        case 'g':
          arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
          break;
        case 'o':
          arg = (parseInt(arg, 10) >>> 0).toString(8);
          break;
        case 's':
          arg = String(arg);
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;
        case 't':
          arg = String(!!arg);
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;
        case 'T':
          arg = Object.prototype.toString
            .call(arg)
            .slice(8, -1)
            .toLowerCase();
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;
        case 'u':
          arg = parseInt(arg, 10) >>> 0;
          break;
        case 'v':
          arg = arg.valueOf();
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;
        case 'x':
          arg = (parseInt(arg, 10) >>> 0).toString(16);
          break;
        case 'X':
          arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
          break;
      }
      if (re.json.test(ph.type)) {
        output += arg;
      } else {
        if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
          sign = is_positive ? '+' : '-';
          arg = arg.toString().replace(re.sign, '');
        } else {
          sign = '';
        }
        pad_character = ph.pad_char ? (ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1)) : ' ';
        pad_length = ph.width - (sign + arg).length;
        pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : '';
        output += ph.align
          ? sign + arg + pad
          : pad_character === '0' ? sign + pad + arg : pad + sign + arg;
      }
    }
  }
  return output;
}

var sprintf_cache = Object.create(null);

function sprintf_parse(fmt:any) {
  if (sprintf_cache[fmt]) {
    return sprintf_cache[fmt];
  }

  var _fmt = fmt,
    match,
    parse_tree = [],
    arg_names = 0;
  while (_fmt) {
    if ((match = re.text.exec(_fmt)) !== null) {
      parse_tree.push(match[0]);
    } else if ((match = re.modulo.exec(_fmt)) !== null) {
      parse_tree.push('%');
    } else if ((match = re.placeholder.exec(_fmt)) !== null) {
      if (match[2]) {
        arg_names |= 1;
        var field_list = [],
          replacement_field = match[2],
          field_match = [];
        if ((field_match = re.key.exec(replacement_field)) !== null) {
          field_list.push(field_match[1]);
          while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
            } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
            } else {
              throw new SyntaxError('[sprintf] failed to parse named argument key');
            }
          }
        } else {
          throw new SyntaxError('[sprintf] failed to parse named argument key');
        }
        match[2] = field_list;
      } else {
        arg_names |= 2;
      }
      if (arg_names === 3) {
        throw new Error(
          '[sprintf] mixing positional and named placeholders is not (yet) supported',
        );
      }

      parse_tree.push({
        placeholder: match[0],
        param_no: match[1],
        keys: match[2],
        sign: match[3],
        pad_char: match[4],
        align: match[5],
        width: match[6],
        precision: match[7],
        type: match[8],
      });
    } else {
      throw new SyntaxError('[sprintf] unexpected placeholder');
    }
    _fmt = _fmt.substring(match[0].length);
  }
  return (sprintf_cache[fmt] = parse_tree);
}



function getNumberParts(x:number ) {
  if(isNaN(x)) {
      return {mantissa: -6755399441055744, exponent: 972};
  }
  var sig = x > 0 ? 1 : -1;
  if(!isFinite(x)) {
      return {mantissa: sig * 4503599627370496, exponent: 972};
  }
  x = Math.abs(x);
  var exp = Math.floor(Math.log(x)*Math.LOG2E)-52;
  var man = x/Math.pow(2, exp);
  return {mantissa: sig*man, exponent: exp};
}

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




function roundNumberToHalfItsMantissaLength(rnum: number) {
  console.log('========================================================> ');
  let flipper = 1;
  let frontNumberDigitsToRoundTo = 0;

  const parts = numberParts(rnum / 10, 10);
  const parts2 = getNumberPartsBin(rnum );
  console.log('parts2.mantissa ' +parts2.mantissa)
  // const vspMantisa= sprintf('%d', parts.mantissa);

  const mantissaLength = parts.mantissa.toString(10).length - 1; // contians a .
  
  frontNumberDigitsToRoundTo = Math.ceil(mantissaLength / 2);
  console.log('for input <=======: ' + rnum);
  console.log('fmantissaLength: ' + mantissaLength);
  console.log('frontNumberDigitsToRoundTo ' + frontNumberDigitsToRoundTo);
  console.log('mantissaLength ' + mantissaLength);
  console.log('parts.mantissa.toString(10) ' + parts.mantissa.toString(10));
  console.log('=====> ');
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


  frontNumberDigitsToRoundTo = 2;
  const rlength = -1 * (parts.exponent - (frontNumberDigitsToRoundTo - 2));
  const newnumber = flipper * Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
  return parseFloat(newnumber.toString());
}

console.log(roundNumberToHalfItsMantissaLength(-100000001));
console.log(roundNumberToHalfItsMantissaLength(-99999999));
console.log(roundNumberToHalfItsMantissaLength(-10000001));
console.log(roundNumberToHalfItsMantissaLength(-9999999));
console.log(roundNumberToHalfItsMantissaLength(-1000001));
console.log(roundNumberToHalfItsMantissaLength(-999999));
console.log(roundNumberToHalfItsMantissaLength(-100001));
console.log(roundNumberToHalfItsMantissaLength(-99999));
console.log(roundNumberToHalfItsMantissaLength(-10001));
console.log(roundNumberToHalfItsMantissaLength(-9999));
console.log(roundNumberToHalfItsMantissaLength(-1001));
console.log(roundNumberToHalfItsMantissaLength(-999));
console.log(roundNumberToHalfItsMantissaLength(-101));
console.log(roundNumberToHalfItsMantissaLength(-99));
console.log(roundNumberToHalfItsMantissaLength(-9));
console.log(roundNumberToHalfItsMantissaLength(-1));
console.log(roundNumberToHalfItsMantissaLength(0.1));
console.log(roundNumberToHalfItsMantissaLength(0.09));
console.log(roundNumberToHalfItsMantissaLength(0.01));
console.log(roundNumberToHalfItsMantissaLength(0.09));
console.log(roundNumberToHalfItsMantissaLength(0.001));
console.log(roundNumberToHalfItsMantissaLength(0.0009));
console.log(roundNumberToHalfItsMantissaLength(0));
console.log(roundNumberToHalfItsMantissaLength(0.0009));
console.log(roundNumberToHalfItsMantissaLength(0.001));
console.log(roundNumberToHalfItsMantissaLength(0.09));
console.log(roundNumberToHalfItsMantissaLength(0.01));
console.log(roundNumberToHalfItsMantissaLength(0.09));
console.log(roundNumberToHalfItsMantissaLength(0.1));
console.log(roundNumberToHalfItsMantissaLength(1));
console.log(roundNumberToHalfItsMantissaLength(9));
console.log(roundNumberToHalfItsMantissaLength(99));
console.log(roundNumberToHalfItsMantissaLength(101));
console.log(roundNumberToHalfItsMantissaLength(909));
console.log(roundNumberToHalfItsMantissaLength(1001));
console.log(roundNumberToHalfItsMantissaLength(9999));
console.log(roundNumberToHalfItsMantissaLength(10001));
console.log(roundNumberToHalfItsMantissaLength(99999));
console.log(roundNumberToHalfItsMantissaLength(100001));
console.log(roundNumberToHalfItsMantissaLength(999999));
console.log(roundNumberToHalfItsMantissaLength(1000001));
console.log(roundNumberToHalfItsMantissaLength(9999999));
console.log(roundNumberToHalfItsMantissaLength(10000001));
console.log(roundNumberToHalfItsMantissaLength(99999999));
console.log(roundNumberToHalfItsMantissaLength(100000001));
