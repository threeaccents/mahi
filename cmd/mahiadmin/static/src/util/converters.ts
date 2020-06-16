export const byteToGB = (num: number): number => {
  const result = num / 1000000000
  return roundFloat(result)
}

export const roundFloat = (num: number): number => {
  return Math.round(num * 100) / 100
}

export const limitLen = (str: string, length: number): string => {
  return str.length <= length ? str : `${str.substr(0, (length - 3))}...`
}

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}