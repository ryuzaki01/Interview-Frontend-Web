export function maskPhone(str) {
  if (!str) { return ''; }

  const pattern = /(\+?\d{4})(\d{4})(\d+)/g;

  const newStr = str.replace(pattern, function (match, start, middle, end) {
    const length = end.length;
    const nKeep = 3;
    const n = length - nKeep;
    const mask = n >= 0 ? '*'.repeat(n) : '';

    return `****-****-${mask}${end.slice(n)}`;
  });

  return newStr;
}

export function maskEmail(str) {
  if (!str) { return ''; }

  const strings = str.split('@');

  if (strings.length <= 1) { return ''; }

  const username = strings[0];
  const domain = strings[1];

  if (!username) { return ''; }

  const n = Math.ceil(username.length / 2);
  const revealed = username.slice(0, username.length / 2);
  const mask = n >= 0 ? '*'.repeat(n) : '';

  const newStr = `${revealed}${mask}@${domain}`;

  return newStr
}
