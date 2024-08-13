import { Breadcrumb } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../../../../Routes/PrivateRoutes';
import { capitalizeFirstLetter } from '../../../../utils/functions';
import './style.scss';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="page-title w-100 mb-3">
      <h4>
        {
          (PRIVATE_ROUTES || [])?.find(
            (routeConfig) => routeConfig.path === location.pathname
          )?.title
        }
      </h4>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return isLast ? (
            <Breadcrumb.Item key={to}>
              {capitalizeFirstLetter(value)}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={to}>
              {capitalizeFirstLetter(value)}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      {/* <h1 className="h4">Dashboard</h1> */}
    </div>
  );
}

export default Breadcrumbs;
