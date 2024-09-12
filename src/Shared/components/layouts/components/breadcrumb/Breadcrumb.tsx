import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../constants/constants';
import { capitalizeFirstLetter } from '../../../../utils/functions';
import './style.scss';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;

    return (
      <Breadcrumb.Item key={to} active={isLast}>
        {!isLast ? (
          <Link to={to}>
            {capitalizeFirstLetter(decodeURIComponent(value.replace('-', ' ')))}
          </Link>
        ) : (
          capitalizeFirstLetter(decodeURIComponent(value.replace('-', ' ')))
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className="page-title w-100 mb-3">
      {/* {pageTitle && <h4>{pageTitle}</h4>} */}
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
