import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { PRIVATE_ROUTES } from '../../../../../Routes/PrivateRoutes';
import { capitalizeFirstLetter, matchRoute } from '../../../../utils/functions';
import './style.scss';
import { ROUTES } from '../../../../constants';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Use the matchRoute utility to find the page title
  const pageTitle = matchRoute(location.pathname, PRIVATE_ROUTES);

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    return (
      <Breadcrumb.Item key={to} active={isLast}>
        {!isLast ? (
          <Link to={to}>
            {capitalizeFirstLetter(decodeURIComponent(value))}
          </Link>
        ) : (
          capitalizeFirstLetter(decodeURIComponent(value))
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className="page-title w-100 mb-3">
      {pageTitle && <h4>{pageTitle}</h4>}
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to={ROUTES.HOMEPAGE}>Home</Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;
