import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { addCartThunk } from '../store/slices/cart.slice';
import { setLoading } from '../store/slices/loading.slice';
import { filterCategoryThunk } from '../store/slices/products.slice';


const ProductsId = () => {
  const { id } = useParams();
  const [productSelected, setProductSelected] = useState({})
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();
  const productsSuggestions = useSelector(state => state.products)
  const [img, setImg] = useState(0)
  const [quanty, setQuanty] = useState(1)
  const [imgSelected, setImgSelected] = useState({})
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProductSelected(res.data);
        setImgSelected(res.data.images?.[0]);
        dispatch(filterCategoryThunk(res.data.categoryId))
      })
      .finally(() => dispatch(setLoading(false)))
  }, [id])

  const prev = () => {
    setImg(img - 1)
    setImgSelected(productSelected.images?.[img - 1])
  }
  const next = () => {
    setImg(img + 1)
    setImgSelected(productSelected.images?.[img + 1])
  }

  const selectImg = (image) => {
    setImgSelected(image)
    setImg(productSelected.images?.indexOf(image))
  }

  const data = {
    "quantity": quanty,
    "productId": productSelected.id,
  }
  const addProduct = () => {
    if (token) {
      alert("Se ha agregado un articulo")
      dispatch(addCartThunk(data))
    } else {
      navigate("/login")
    }
  }

  return (
    <div className='produc_detail'>
      <h2>{productSelected.title}</h2>
      <div className='details'>
        <div className='details__img'>
          {img > 0 &&
            <i className='bx bxs-left-arrow-circle bx-lg' onClick={() => prev()}></i>}
          {img < productSelected.images?.length - 1 &&
            <i className='bx bxs-right-arrow-circle bx-lg' onClick={() => next()}></i>}
          <img className='img_selected' src={imgSelected?.url} alt="" />
          <div className='preview'>
            {productSelected.images?.map(image => (
              <div className='img_preview'
                style={{ borderColor: imgSelected?.url === image.url ? "salmon" : "white" }}
                key={image.id} onClick={() => selectImg(image)}>
                <img src={image?.url} alt="" />
              </div>
            ))
            }
          </div>
        </div>
        <div className='description'>
          <h4>{productSelected.brand}</h4>
          <p>{productSelected.description}</p>
          <div className='quanty_price'>
            <div className='price'>
              <p>Precio</p>
              <h5>{productSelected.price}</h5>
            </div>
            <div className='quanty'>
              <p>Cantidad</p>
              <div className='quanty_controler'>
                <Button disabled={quanty < 2} variant="success" onClick={() => setQuanty(quanty - 1)}>-</Button>
                <p>{quanty}</p>
                <Button variant="success" onClick={() => setQuanty(quanty + 1)}>+</Button>
              </div>
            </div>
          </div>
          <Button variant="primary" onClick={() => addProduct()}>Agregar al Carrito</Button>
        </div>
      </div>
      <div className='product_sugestions'>
        <h2>Tambien te puede interesar:</h2>
        {productsSuggestions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsId;