export function toType(obj: any) {
  let type = getType(obj)

  if (type === 'number') {
    if (isNaN(obj)) {
      type = 'nan';
    } else if ((obj | 0) != obj) {
      // bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer'
    }
  }

  return type;
}

function getType(obj: object) {
  // @ts-ignore
  return ({})!.toString 
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

export function isTheme(theme: any) {
  const themeKeys = [
      'base00',
      'base01',
      'base02',
      'base03',
      'base04',
      'base05',
      'base06',
      'base07',
      'base08',
      'base09',
      'base0A',
      'base0B',
      'base0C',
      'base0D',
      'base0E',
      'base0F'
  ];

  if (toType(theme) === 'object') {
    for (let i = 0; i < themeKeys.length; i++) {
      if (!(themeKeys[i] in theme)) {
          return false;
      }
    }
    return true;
  }
  return false;
}
