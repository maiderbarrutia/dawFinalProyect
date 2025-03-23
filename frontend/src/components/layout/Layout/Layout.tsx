// Layout.tsx
import React, { ReactNode } from 'react';
// import { useLocation } from 'react-router-dom';
import useHeaderHeight from '../../../hooks/useDynamicHeaderHeight'; // Este es tu hook

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const location = useLocation();  //Para localizar la página donde estas
  const headerHeight = useHeaderHeight();

  // Calcula el paddingTop solo si no estás en la página de inicio
//   const paddingTop = location.pathname !== '/' ? `${headerHeight}px` : '0';

// Calcula el paddingTop de todas las páginas
  const paddingTop = `${headerHeight}px`;


  return (
    <div style={{ paddingTop }}>
      
      <main>{children}</main>
      
    </div>
  );
};

export default Layout;
