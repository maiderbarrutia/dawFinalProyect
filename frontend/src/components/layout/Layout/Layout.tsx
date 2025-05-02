import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import useHeaderHeight from '../../../hooks/useDynamicHeaderHeight';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const headerHeight = useHeaderHeight();

  const specialRoutes = ['/404'];

  const isSpecialRoute = specialRoutes.some(route => location.pathname.startsWith(route));

  const paddingTop = isSpecialRoute ? '0' : `${headerHeight}px`;

  return (
    <main style={{ paddingTop }}>
      {children}
    </main>
  );
};

export default Layout;