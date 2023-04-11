import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
  const purchases = useSelector(state => state.purchases)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchasesThunk())
  }, [])

  return (
    <div>
      <br /><br /><br />
      <h1>Purchases</h1>
      {purchases.map(product => (
        <div className='purchase_card'
          key={product.createdAt}
          onClick={() => navigate(`/products/${product.product.id}`)}
        >
          <img src={product?.product.images[0].url} alt="" />
          <p>{product?.product.title}</p>
          <p>{product?.createdAt.slice(0, 10)}</p>
          <p>{product?.quantity}</p>
          <p>{product?.product.price}</p>
        </div>
      ))
      }

    </div>
  );
};

export default Purchases;