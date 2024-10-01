import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, STRINGS } from '../../../../constants/constants';
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
            {capitalizeFirstLetter(
              decodeURIComponent(value.replace(/-/g, ' '))
            )}
          </Link>
        ) : (
          capitalizeFirstLetter(decodeURIComponent(value.replace(/-/g, ' ')))
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className="page-title w-100 mb-3">
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to={ROUTES.HOMEPAGE}>{STRINGS.HOME}</Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;
