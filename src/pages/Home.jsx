import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';
import { getProductSearch, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {
  const products = useSelector(state => state.products)
  const [categories, setCategories] = useState([])
  const [newsSearch, setNewsSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  useEffect(() => {
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then(res => setCategories(res.data))
  }, [])

  return (
    <div className='home'>
      <div className='aside'>
        <Filter categories={categories} />
      </div>
      <div className='aside_products'>
        <div className='input'>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Buscar articulo"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(getProductSearch(newsSearch))}
              variant="outline-secondary"
              id="button-addon2"
            >
              Buscar
            </Button>
          </InputGroup>
        </div>
        <div className='product_container'>

          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;