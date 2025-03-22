
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from '@components/layout/Header/Header';
import Home from '@/pages/home/Home';
import Footer from '@components/layout/Footer/Footer';

import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';


const SiteRoutes: React.FC = () => {
  return (
      <Router>
        {/* Header y Footer se mantienen en todas las rutas */}
        <Header />
        <main>
          <Routes>

          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

            {/* Ruta para la página principal donde estarán todas las secciones */}
            <Route path="/" element={<Home />} />
            
            {/* Ruta para las demás páginas */}
            {/* <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
            <Route path="/politica-de-cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Home />} />
            </Route> */}
          </Routes>
        </main>
        {/* <CookiesBanner /> */}
        <Footer />
      </Router>
  );
};

export default SiteRoutes;
