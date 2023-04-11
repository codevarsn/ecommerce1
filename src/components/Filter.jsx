import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, getProductsThunk, setProducts } from '../store/slices/products.slice';

const Filter = ({ categories }) => {

  const dispatch = useDispatch();
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [message, setMessage] = useState(false)
  const [sumaryFilter, setSumaryFilter] = useState(false)
  const [productToFilter, setProductToFilter] = useState([])
  const [categorySelected, setCategorySelected] = useState("")

  useEffect(() => {
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
      .then(res => setProductToFilter(res.data))
  }, [])


  const getFilter = () => {
    setCategorySelected("")
    let filteredProducts = productToFilter.filter(product =>
      product.price >= Number(from) && product.price <= Number(to))
    if (filteredProducts[0]) {
      setSumaryFilter(true)
      dispatch(setProducts(filteredProducts))
    } else {
      showMessage()
    }
  }

  const showMessage = () => {
    setMessage(true)
    setFrom(0)
    setTo(0)
    setTimeout(() => {
      setMessage(false)
    }, 2000)
  }

  const filterCategory = (category) => {
    setSumaryFilter(false)
    dispatch(filterCategoryThunk(category.id))
    setCategorySelected(category.name)
  }

  const closeFilter = () => {
    dispatch(getProductsThunk())
    setSumaryFilter(false)
    setCategorySelected("")
    setFrom("")
    setTo("")
  }

  return (
    <>
      <div className='filters'>
        <h4>Filtro activo:</h4>
        {sumaryFilter &&
          <p>Precio: de {from} a {to}
            <i className='bx bx-x' onClick={() => closeFilter()}></i></p>
        }
        {categorySelected &&
          <p>Categoria: {categorySelected}
            <i className='bx bx-x' onClick={() => closeFilter()}></i></p>
        }
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filtrar Precio</Accordion.Header>
          <hr />
          <Accordion.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder='Desde'
                type='number'
                value={from}
                onChange={e => setFrom(e.target.value)} />
            </InputGroup>
            <InputGroup>
              <Form.Control
                aria-label="Dollar amount (with dot and two decimal places)"
                placeholder='Hasta'
                value={to}
                type='number'
                onChange={e => setTo(e.target.value)} />
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup><br />
            <Button
              variant="primary"
              onClick={() => getFilter()}
              disabled={Number(to) <= Number(from)}>Aplicar
            </Button>
            {
              message && <p style={{ color: "red" }}><i>No existen productos en ese rango de precios</i></p>
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Filtrar Categorias</Accordion.Header>
          <hr />
          <Accordion.Body>
            {
              categories.map(category => (
                <p className='categories' key={category.id}
                  onClick={() => filterCategory(category)}>
                  {category.name}</p>
              ))
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Filter;