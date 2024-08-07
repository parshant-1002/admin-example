import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../Shared/components/layouts/sidebar';
import Navbar from '../../../Shared/components/layouts/navbar';
import SIDEBAR_NAV from '../../../Shared/components/layouts/sidebar/routes';

interface PrivateLayoutProps {
  children: ReactNode; // ReactNode allows any React children: JSX, strings, fragments, etc.
}

function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <>
      <Navbar />
      <Sidebar items={SIDEBAR_NAV} />
      {/* <div className="bg-img" /> */}
      <main id="main" className="main">
        {/* <Breadcrumb /> */}
        {children}
      </main>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
