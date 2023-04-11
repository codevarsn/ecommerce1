import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoading } from './loading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            const purchases = action.payload;
            return purchases
        }
    }
})

export const getPurchasesThunk = () => dispatch => {
    dispatch(setLoading(true));
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, getConfig())
        .then(res => dispatch(setPurchases(res.data)))
        .finally(dispatch(setLoading(false)))
    }

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
