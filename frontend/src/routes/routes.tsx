
import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext'; 

import Header from '@components/layout/Header/Header';
import Layout from '@components/layout/Layout/Layout';

import Home from '@/pages/home/Home';
import Footer from '@components/layout/Footer/Footer';

import Login from '../pages/login/Login';
// import Register from '../pages/___register/Register';
import Dashboard from '../pages/dashboard/Dashboard';

import FeaturedActivities from '@components/sections/FeaturedActivities/FeaturedActivities';
import ActivitiesPage from '@/pages/activitiesPage/ActivitiesPage';
import ActivityDetail from '@/components/common/ActivityDetail/ActivityDetail';
import CompaniesRegister from '@components/forms/CompanyRegisterForm/CompanyRegisterForm'
import ActivityRegister from '@/components/forms/activityRegisterForm/activityRegisterForm';
import RegistrationForm from '@/components/forms/RegistrationForm/RegistrationForm'


const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};


const SiteRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Header y Footer se mantienen en todas las rutas */}
        <Header />
          <Layout>
            <Routes>

              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            
              {/* Ruta para la página principal donde estarán todas las secciones */}
              <Route path="/" element={<Home />} />
              
              {/* Ruta para las demás páginas */}
              <Route path="/" element={<FeaturedActivities />} />
              <Route path="/actividades" element={<ActivitiesPage />} />
              <Route path="/actividad/:id" element={<ActivityDetail />} />
              <Route path="/crear-cuenta-empresa" element={<CompaniesRegister />} />

              <Route path="/crear-actividad" element={
                <ProtectedRoute>
                  <ActivityRegister />
                </ProtectedRoute>
              }
              />
              <Route path="/inscripcion/:activityId" element={<RegistrationForm />} />
            </Routes>
          </Layout>
        {/* <CookiesBanner /> */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default SiteRoutes;
