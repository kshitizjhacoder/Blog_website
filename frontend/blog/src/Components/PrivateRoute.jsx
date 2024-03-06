import React,{ Component, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
    
return (
  <Component/>
)
};

export default PrivateRoute;
