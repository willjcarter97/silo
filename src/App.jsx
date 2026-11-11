import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import ScrollToTop from './components/Common/ScrollToTop';
import { hasPreviewCookie, loadPrismicToolbar } from './lib/prismicPreview';

const App = () => {
  // Keep the Prismic toolbar up while an editor is previewing a draft
  useEffect(() => {
    if (hasPreviewCookie()) loadPrismicToolbar();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen w-full">
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
