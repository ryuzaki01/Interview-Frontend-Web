const base36Charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let debounceTimeout;

export const createChainedFunction = (...funcs) => {
  return funcs
    .filter((f) => f && f !== null)
    .reduce((acc, f) => {
      if (typeof f !== "function") {
        throw new Error(
          "Invalid Argument Type, must only provide functions, undefined, or null."
        );
      }

      if (acc === null) {
        return f;
      }

      return function chainedFunction(...args) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    }, null);
};

export const ucfirst = (str) => {
  let char = String(str);

  return `${(char.charAt(0) || "").toUpperCase()}${char.slice(1)}`;
};

export const startCase = (str) => {
  return String(str).replace(/(\b\w)/gi, (word) => word.toUpperCase());
};

export const kebabCase = (str) => {
  return String(str)
    .toLowerCase()
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
};

export const debounce = (func, timeout, options) => {
  const { leading = false, trailing = true } = options || {};

  if (debounceTimeout) {
    if (!leading && !trailing) {
      func();
    }

    if (!trailing) {
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = undefined;
  }

  if (leading && !debounceTimeout) {
    func();
  }

  debounceTimeout = setTimeout(
    trailing
      ? func
      : () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = undefined;
        },
    timeout
  );
};

export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

export const noop = (obj) => obj === undefined;

export const range = (start, end, step) => {
  let resultRange = [...new Array(Math.abs(start)).keys()];

  if (!end && start < 0) {
    resultRange = resultRange.map((k) => -k);
  }

  if (end) {
    let count = Math.abs(end - start);

    if (step) {
      count = count / step;
    }

    resultRange = [...new Array(count).keys()].map((k) => {
      if (step) {
        return k * step;
      }

      return end > 0 ? k + 1 : -k;
    });
  }

  return resultRange;
};

export const currency = (symbol, number, lang) => {
  const parsedNumber = parseInt(number, 10);
  const negativeNumber = parsedNumber < 0;

  return `${negativeNumber ? "- " : ""}${symbol ? `${symbol} ` : ""}${String(
    Math.abs(parsedNumber) || 0
  ).replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    symbol === "USD" || lang === "en" ? "$1," : "$1."
  )}`;
};

export const promiseState = (p) => {
  const t = {};

  return Promise.race([p, t]).then(
    (v) => (v === t ? "pending" : "fulfilled"),
    () => "rejected"
  );
};

export const parseQuery = (subject) => {
  const results = {};
  const parser = /[^&?]+/g;
  let match = parser.exec(subject);

  while (match !== null) {
    const parts = match[0].split("=");

    results[parts[0]] = parts[1];
    match = parser.exec(subject);
  }

  return results;
};

export const stringifyQuery = /* istanbul ignore next */ (object) => {
  if (!object) {
    return "";
  }

  return Object.keys(object)
    .map((k) => `${k}=${object[k]}`)
    .join("&");
};

export const stringPadding = (nmbr, padStr) => {
  const trgtLength = padStr.length >> 0; // truncate if number or convert non-number to 0;
  const endDigit = trgtLength - nmbr.length;

  return nmbr.length < trgtLength
    ? `${padStr.slice(0, endDigit)}${nmbr}`
    : nmbr;
};

export const slugify = (str) =>
  String(str)
    .trim()
    .toLowerCase()
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[\s\W-]+/g, "-"); // Replace spaces, non-word characters and dashes with a single dash (-)

export const base36Encode = (integer) => {
  if (integer === 0) {
    return 0;
  }

  let s = [];

  while (integer > 0) {
    s = [base36Charset[integer % 36], ...s];
    integer = Math.floor(integer / 36);
  }

  return s.join("");
};

export const base36Decode = (chars) =>
  chars
    .split("")
    .reverse()
    .reduce((prev, curr, i) => prev + base36Charset.indexOf(curr) * 36 ** i, 0);

export const isEmail = (email) => {
  const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  return regexEmail.test(email);
};

export const isPhone = (phone) => {
  const regexPhone = /^\+?[0-9]+$/;

  return regexPhone.test(phone);
};

export const getErrorGraphql = (error) => {
  return error?.graphQLErrors[0]?.message || ""
}
