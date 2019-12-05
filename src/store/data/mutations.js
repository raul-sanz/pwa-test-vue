export function createProduct (state,item) {
  state.products.push(item)
}

export function deleteProduct (state,index ) {
  state.products.splice(index,1)
}

export function updateProduct (state,obj ) {
  state.products.splice(obj.index,1)
  state.products.push(obj.item)
}