import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface PublicLayoutProps {
  children: ReactNode; // ReactNode allows any React children: JSX, strings, fragments, etc.
}
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      {/* <Navbar />
            <Sidebar /> */}
      <main>{children}</main>
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
