import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'; 


const ProtectedRoutes = () => { 
    const token = localStorage.getItem("token")

    if(token){ 
        return <Outlet /> 
    } else { 
        return <Navigate to='/' /> 
    }
};
export default ProtectedRoutes;