import { createSlice } from '@reduxjs/toolkit'; 
import axios from 'axios';
import { setLoading } from './loading.slice';

export const productsSlice = createSlice({ 
    name: 'products', 
    initialState: [], 
    reducers: { 
        setProducts: (state, action) => {
            const products = action.payload;
            return products
        }
    } 
}) 
export const getProductsThunk = () => dispatch => {
    dispatch(setLoading(true))
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
        .then(res => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setLoading(false)))
};
export const filterCategoryThunk = (id) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
      .then((res) => dispatch(setProducts(res.data)))
      .finally(() => dispatch(setLoading(false)));
};
export const getProductSearch = (newsSearch) => async dispatch => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${newsSearch}`);
        return dispatch(setProducts(res.data));
    } finally {
        return dispatch(setLoading(false));
    }
}

export const { setProducts } = productsSlice.actions; 
export default productsSlice.reducer;