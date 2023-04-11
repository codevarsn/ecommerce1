import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoading } from './loading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart
        }
    }
})

export const getCartThunk = () => dispatch => {
    dispatch(setLoading(true));
    return axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/cart",getConfig())
        .then(res => dispatch(setCart(res.data)))
        .finally(() => dispatch(setLoading(false)));
}
export const addCartThunk = (data) => dispatch => {
    dispatch(setLoading(true));
    return axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
        .then((res) => dispatch(getCartThunk(res.data)))
        .finally(() => dispatch(setLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;