// could maybe clean this up
// name the functions within the filter and map to better understand what we're checking
export const generateParams = (obj: any): string => {
  if (!obj) return '';
  // generate the query params
  let queryParam = Object.keys(obj)
    .filter(key => obj[key] && obj[key] !== '')
    .map(key => key + '=' + obj[key])
    .join('&')

  // adds a `&` if queryParam is not empty
  queryParam = queryParam && queryParam !== '' ? `${queryParam}&` : queryParam

  //  Removes a trailing `&` if its left over
  queryParam = queryParam[queryParam.length - 1] == '&' ? queryParam.substring(0, queryParam.length - 1) : queryParam

  return '?' + queryParam
}
