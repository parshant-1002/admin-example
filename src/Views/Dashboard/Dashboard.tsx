// src/components/Dashboard.tsx

import { Link } from 'react-router-dom';
import { RedirectionIcon } from '../../assets';
import Breadcrumbs from '../../Shared/components/layouts/components/breadcrumb/Breadcrumb';
import { BidsHistory } from '../Transactions';
import cardData from './helpers/constants';
import './style.scss';
import { convertToLocale } from '../../Shared/utils/functions';

function Dashboard() {
  return (
    <>
      <Breadcrumbs />
      <div className="row dashboad-cards">
        {cardData?.map((card) => (
          <div key={card?.label} className="col-lg-3 col-sm-6 col-xl-3 mb-4">
            <div className="card h-100">
              <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
                <em className="d-Icon">
                  <img src={card.icon} alt="Icon" width="70" />
                </em>
                <span className="text-small">{card.label}</span>
                <h2 className="h4">
                  {convertToLocale(card.value, card.isCurrency)}
                </h2>
                <span
                  className={`d-inline-flex align-items-center badge ${card.badge.color}`}
                >
                  <em className="me-2">
                    <img
                      src={card.badge.icon}
                      alt="badge"
                      width={16}
                      height={16}
                    />
                  </em>
                  {card.badge.percentage}
                </span>
                <Link className="redirection" to="">
                  <img src={RedirectionIcon} alt="" width="40" height="40" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BidsHistory onDashBoard={false} />
    </>
  );
}

export default Dashboard;
