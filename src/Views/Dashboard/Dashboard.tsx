// src/components/Dashboard.tsx

import Breadcrumbs from '../../Shared/components/layouts/components/breadcrumb/Breadcrumb';
import './style.scss';

function Dashboard() {
  return (
    <>
      <Breadcrumbs />
        <div className="grid">
          <div className="card">
            <div className="card-body">
              <h6>Total Users</h6>
              <p className="amount">5,900.00</p>
              <p className="change">55% Higher</p>
            </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>New Users</h6>
            <p className="amount">5,900.00</p>
            <p className="change">55% Higher</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>Users Online</h6>
            <p className="amount">5,900.00</p>
            <p className="change">55% Higher</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>Users Contacted live support</h6>
            <p className="amount">5,900.00</p>
            <p className="change">55% Higher</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>Total bids</h6>
            <p className="amount">15</p>
            <p className="change">5% Increased</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>Total Expenses</h6>
            <p className="amount">$8,500</p>
            <p className="change">12% Decrease</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6>Active Auctions</h6>
            <p className="amount">8,500</p>
            <p className="change">12% Decrease</p>
          </div>
          </div>
          <div className="card">
          <div className="card-body">
            <h6> Auctions with reserve met</h6>
            <p className="amount">8,500</p>
            <p className="change">12% Decrease</p>
          </div>
          </div>
        </div>
    </>
  );
}

export default Dashboard;
