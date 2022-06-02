function getMinMax(str) {
  const out = {};
  
  temp = str.split(' ')
    .map(item => +item)
    .filter(item => typeof(item) === 'number' && !isNaN(item))
    .sort( (a,b) => a - b)
  
  out.min = temp[0]
  out.max = temp[temp.length - 1]
  return out
}
