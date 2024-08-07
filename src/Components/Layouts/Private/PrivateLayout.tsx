import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../Shared/components/layouts/navbar';
import Sidebar from '../../../Shared/components/layouts/sidebar';

interface PrivateLayoutProps {
  children: ReactNode; // ReactNode allows any React children: JSX, strings, fragments, etc.
}

function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <>
      <Navbar />
      <Sidebar />
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
