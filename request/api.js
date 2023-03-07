import request from './index.js'

const addProducts = (params) => {
  return request.post('/products.json', params)
}

const getProducts = () => {
  return request.get('/products.json')
}

export {
  addProducts,
  getProducts
}