import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import storeContext from '../context/storeContext';

const ProtectDashboard = () => {
  const { store } = useContext(storeContext)
  console.log(store)

  if (store?.userInfo?.role === 'admin' || store?.userInfo?.role === 'writer') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectDashboard;
