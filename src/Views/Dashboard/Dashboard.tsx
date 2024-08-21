// src/components/Dashboard.tsx

import { Link } from 'react-router-dom';
import { AuctionIcon, Lossicon, NewUserIcon, profitIcon, RedirectionIcon, ReserveIcon, SupportIcon, TotalBidIcon, UserIcon } from '../../assets';
import Breadcrumbs from '../../Shared/components/layouts/components/breadcrumb/Breadcrumb';
import './style.scss';

function Dashboard() {
  return (
    <>
      <Breadcrumbs />
      <div className="row dashboad-cards">
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={UserIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Total Users</span>
              <h2 className="h4">5,900.00</h2>
              <span className="d-inline-flex align-items-center badge bg-success">
                <em className="me-2">
                  <img src={profitIcon} alt="profit" width={16} height={16} />{' '}
                </em>
                55%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={NewUserIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Total Users</span>
              <h2 className="h4">5,900.00</h2>
              <span className="d-inline-flex align-items-center badge bg-success">
                <em className="me-2">
                  <img src={profitIcon} alt="profit" width={16} height={16} />{' '}
                </em>
                55%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={SupportIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Users Contacted Live Support</span>
              <h2 className="h4">4,900.00</h2>
              <span className="d-inline-flex align-items-center badge bg-success">
                <em className="me-2">
                  <img src={profitIcon} alt="profit" width={16} height={16} />{' '}
                </em>
                55%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={TotalBidIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Total Bids</span>
              <h2 className="h4">15</h2>
              <span className="d-inline-flex align-items-center badge bg-success">
                <em className="me-2">
                  <img src={profitIcon} alt="profit" width={16} height={16} />{' '}
                </em>
                5%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={AuctionIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Active Auctions</span>
              <h2 className="h4">8,500</h2>
              <span className="d-inline-flex align-items-center badge bg-danger">
                <em className="me-2">
                  <img src={Lossicon} alt="profit" width={16} height={16} />{' '}
                </em>
                5%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-xl-4 mb-4">
          <div className="card h-100">
            <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
              <em className="d-Icon">
                <img src={ReserveIcon} alt="Icon" width="70" />
              </em>
              <span className="text-small">Auctions with Reserve Met</span>
              <h2 className="h4">6,500</h2>
              <span className="d-inline-flex align-items-center badge bg-danger">
                <em className="me-2">
                  <img src={Lossicon} alt="profit" width={16} height={16} />{' '}
                </em>
                12%
              </span>
              <Link className="redirection" to={''}>
                <img src={RedirectionIcon} alt="" width="40" height={40} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
