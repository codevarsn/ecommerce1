import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
import { filterCategoryThunk } from '../store/slices/products.slice';
import {  } from 'react-hook-form';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")

    const data = {
        "quantity": 1,
        "productId": product.id,
    }
    const addProduct = () => {
        if(token){
            alert("Se ha agregado un articulo")
            dispatch(addCartThunk(data))
        } else {
            navigate("/login")
        }  
    }

    return (
        <Card className='card' style={{backgroundColor: "white", width: '16rem', height: '21rem' }} onClick={() => navigate(`/products/${product.id}`)} >
            <Card.Img style={{ width: '90%' }} className='img_card' variant="top" src={product.images?.[0].url} />
            <Card.Body>
                <Card.Title style={{fontSize: "1.1rem"}}>{product.title.slice(0, 49)}</Card.Title>
                <Card.Text>
                    {product.price}
                </Card.Text>
                <Button variant="primary" onClick={() => addProduct()}>Agregar<i className='bx bx-cart-download bx-fade-right' ></i></Button>
            </Card.Body>
        </Card> 
    );
};

export default ProductCard;