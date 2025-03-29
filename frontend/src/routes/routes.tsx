
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext'; 

import Header from '@components/layout/Header/Header';
import Layout from '@components/layout/Layout/Layout';

import Home from '@/pages/home/Home';
import Footer from '@components/layout/Footer/Footer';

import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';

import FeaturedActivities from '@components/sections/FeaturedActivities/FeaturedActivities';
import ActivitiesPage from '@/pages/activitiesPage/ActivitiesPage';


const SiteRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Header y Footer se mantienen en todas las rutas */}
        <Header />
          <Layout>
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
            
              {/* Ruta para la página principal donde estarán todas las secciones */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta para las demás páginas */}
              <Route path="/" element={<FeaturedActivities />} />
              <Route path="/actividades" element={<ActivitiesPage />} />
              {/* <Route path="/proyectos/:slug" element={<ProjectDetail />} />
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/politica-de-cookies" element={<Cookies />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home />} />
              </Route> */}
            </Routes>
          </Layout>
        {/* <CookiesBanner /> */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default SiteRoutes;
