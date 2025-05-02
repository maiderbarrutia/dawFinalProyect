
import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext'; 

import Header from '@components/layout/Header/Header';
import Layout from '@components/layout/Layout/Layout';

import Home from '@/pages/home/Home';
import Footer from '@components/layout/Footer/Footer';

import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';

import FeaturedActivities from '@components/sections/FeaturedActivities/FeaturedActivities';
import ActivitiesPage from '@/pages/activitiesPage/ActivitiesPage';
import ActivityDetail from '@/components/common/ActivityDetail/ActivityDetail';
import CompaniesRegister from '@components/forms/CompanyRegisterForm/CompanyRegisterForm'
import ActivityRegister from '@/components/forms/activityRegisterForm/activityRegisterForm';
import RegistrationForm from '@/components/forms/RegistrationForm/RegistrationForm'

import NotFound from '@/pages/notFound/NotFound';
import PrivacyPolicy from '@/pages/privacyPolicy/PrivacyPolicy';
import Cookies from '@/pages/cookiesPolicy/CookiesPolicy'
import CookiesBanner from '@/components/common/CookiesBanner/CookiesBanner';


const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};


const SiteRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
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
              <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
              <Route path="/politica-de-cookies" element={<Cookies />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </Layout>
          <CookiesBanner />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default SiteRoutes;
