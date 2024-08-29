// src/components/Dashboard.tsx

import { debounce } from 'lodash';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDashboardQuery } from '../../Services/Api/module/dashboard';
import { Filters } from '../../Shared/components';
import { FiltersState } from '../../Shared/components/Filters/helpers/models';
import { DATE_FORMATS, STRINGS } from '../../Shared/constants';
import {
  convertToLocale,
  removeEmptyValues,
} from '../../Shared/utils/functions';
import { Lossicon, RedirectionIcon, profitIcon } from '../../assets';
import { BidsHistory } from '../Transactions';
import cardData from './helpers/constants';
import './style.scss';

function Dashboard() {
  const [search, setSearch] = useState<string>('');
  const onComponentMountRef = useRef(false);

  const [filters, setFilters] = useState<{
    fromDate: string | Date | undefined;
    toDate: string | Date | undefined;
  }>({
    fromDate: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
    toDate: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
  });
  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 1000);

  const handleApplyFilters = (filterState: FiltersState) => {
    setFilters({
      fromDate: moment(filterState?.startDate).format(
        DATE_FORMATS.DISPLAY_DATE_REVERSE
      ),
      toDate: moment(filterState?.endDate).format(
        DATE_FORMATS.DISPLAY_DATE_REVERSE
      ),
    });
  };
  const queryParams = {
    searchString: search,
    ...filters,
  };
  const { data: dashboard, refetch } = useGetDashboardQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });
  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, search, filters]);
  return (
    <>
      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        showDateFilter
        showSearch={false}
        handleApply={handleApplyFilters}
        showDateFilterTabs
      />
      <div className="row dashboad-cards">
        {cardData?.map((card) => (
          <div key={card?.label} className="col-lg-3 col-sm-6 col-xl-3 mb-4">
            <div className="card h-100">
              <div className="card-body d-inline-flex flex-column justify-content-center align-items-start">
                <em className="d-Icon">
                  <img src={card.icon} alt="Icon" width="70" />
                </em>
                <span className="text-small">{card.label}</span>
                <div className="growth_wrapper d-flex align-items-center gap-3 mt-3 mr-2 flex-wrap">
                  <h2 className="h4 m-0">
                    {convertToLocale(dashboard?.[card.field], card.isCurrency)}
                  </h2>
                  <span
                    className={`d-inline-flex align-items-center badge ${
                      dashboard?.[card.percentageField] > 0
                        ? 'bg-success'
                        : 'bg-danger'
                    }`}
                  >
                    <em className="me-2">
                      <img
                        src={
                          dashboard?.[card.percentageField] > 0
                            ? profitIcon
                            : Lossicon
                        }
                        alt="badge"
                        width={16}
                        height={16}
                      />
                    </em>
                    {convertToLocale(dashboard?.[card.percentageField])}
                  </span>
                </div>
                <Link
                  className="redirection d-none"
                  to={card?.redirectionRoute || ''}
                >
                  <img src={RedirectionIcon} alt="" width="40" height="40" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BidsHistory onDashBoard={false} heading={STRINGS.BIDS_HISTORY} />
    </>
  );
}

export default Dashboard;
