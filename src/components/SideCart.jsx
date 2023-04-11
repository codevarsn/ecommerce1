import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { getPurchasesThunk, setPurchases } from '../store/slices/purchases.slice';
import getConfig from '../utils/getConfig';


const SideCart = ({ show, handleClose }) => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [totalP, setTotalP] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        if(token){
            dispatch(getCartThunk())
        }
    }, [])

    const deleteProduct = (id) => {
        axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, getConfig())
            .then(res => dispatch(getCartThunk()))
    }

    const addQuantity = (product) => {
        const data = {
            "quantity": product.quantity + 1
        }
        axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`, data, getConfig())
            .then(res => dispatch(getCartThunk()))
    }

    const restQuantity = (product) => {
        const data = {
            "quantity": product.quantity - 1
        }
        axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`, data, getConfig())
            .then(res => dispatch(getCartThunk()))
    }

    const checkOut = () => {
        axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`, {}, getConfig())
            .then(res => {
                dispatch(getPurchasesThunk())
                dispatch(getCartThunk())
            })
    }

    useEffect(() => {
        setTotalP(cart?.map(product => {
            return product.quantity * product.product.price;
        }))
    }, [cart])

    const getTotal = () => {
        let totalG = 0
        for (let i = 0; i < totalP?.length; i++) {
            totalG += totalP[i]
        } return totalG
    }

    return (
        <Offcanvas placement='end' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='cart_container'>
                    {cart.map(product => (
                        <div className='cart' key={product.createdAt}>
                            <img src={product.product.images?.[0].url} alt="" />
                            <div className='cart_description'>
                                <h5>{product.product.title.slice(0, 30)}</h5>
                                <div className='cart_controler'>
                                    <Button disabled={product.quantity < 2} variant="success" onClick={() => restQuantity(product)}>-</Button>
                                    <p>{product.quantity}</p>
                                    <Button variant="success" onClick={() => addQuantity(product)}>+</Button>
                                </div>
                                <p>Sub-Total: $</p>
                            </div>
                            <div className='delete_total'>
                                <i onClick={() => deleteProduct(product.id)} className='bx bxs-x-circle bx-sm'></i>
                                <p>{product.quantity * product.product.price}</p>
                            </div>

                        </div>
                    ))}
                    <p>Total: {getTotal().toFixed(2)}</p>
                    <button className='checkout' onClick={() => checkOut()}><i className='bx bxs-credit-card'></i>CheckOut</button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SideCart;