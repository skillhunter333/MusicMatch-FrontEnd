import { ToastContainer } from 'react-toastify';
import { NavBar, Footer } from '../components';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      
      <ToastContainer className='mt-12'/>
      <NavBar />
      <div className='mt-16 ml-5 mb-16 mr-5'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
