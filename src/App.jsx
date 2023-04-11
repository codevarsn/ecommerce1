import { useEffect } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import ProductsId from './pages/ProductsId'
import NavBar from './components/NavBar'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'

function App() {
  const loading = useSelector(state => state.loading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk())
  }, [])

  return (
    <HashRouter>
      <NavBar />
        {loading && <Loading />}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/products/:id"} element={<ProductsId />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={"/purchases"} element={<Purchases />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App