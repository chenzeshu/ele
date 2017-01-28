export function saveToLocal(id, key, value) {
  let seller = localStorage.__seller__
  if (!seller){
    seller = {}
    seller[id] = {}  //本用户的空间
  }else{
    seller = JSON.parse(seller)
    if(!seller[id]){
      seller[id] = {}
    }
  }

  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id,key,def) {
  let seller = localStorage.__seller__
  if (!seller){
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller){
    return def
  }
  let ref = seller[key]
  return ref || def
}
