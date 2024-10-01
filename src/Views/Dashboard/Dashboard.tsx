import { debounce } from 'lodash';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDashboardQuery } from '../../Services/Api/module/dashboard';
import { Filters } from '../../Shared/components';
import {
  FilterFieldTypes,
  FilterSchema,
  FiltersState,
} from '../../Shared/components/Filters/helpers/models';
import { DATE_FORMATS, STRINGS } from '../../Shared/constants/constants';
import {
  convertToLocale,
  removeEmptyValues,
} from '../../Shared/utils/functions';
import { Lossicon, profitIcon } from '../../assets';
import { cardData, FiltersKeys } from './helpers/constants';
import './style.scss';
import { SelectedFilters } from './helpers/model';

function Dashboard() {
  const [search, setSearch] = useState<string>(STRINGS.EMPTY_STRING);
  const [filtersState, setFiltersState] = useState<FiltersState>({});
  const onComponentMountRef = useRef(false);

  const [filters, setFilters] = useState<{
    fromDate: string | Date | undefined;
    toDate: string | Date | undefined;
  }>({
    fromDate: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
    toDate: moment().format(DATE_FORMATS.DISPLAY_DATE_REVERSE),
  });

  const queryParams = {
    searchString: search,
    ...filters,
  };
  const { data: dashboard, refetch } = useGetDashboardQuery({
    params: removeEmptyValues(
      queryParams as unknown as Record<string, unknown>
    ),
  });

  const debounceSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 1000);

  const handleApplyFilters = (filterState: FiltersState) => {
    const selectedFilters = filterState as SelectedFilters;
    setFilters({
      fromDate: moment(selectedFilters?.dateRange?.startDate).format(
        DATE_FORMATS.DISPLAY_DATE_REVERSE
      ),
      toDate: moment(selectedFilters?.dateRange?.endDate).format(
        DATE_FORMATS.DISPLAY_DATE_REVERSE
      ),
    });
  };

  useEffect(() => {
    if (onComponentMountRef.current) {
      refetch();
    }
    onComponentMountRef.current = true;
  }, [refetch, search, filters]);
  const onChangeFilter = (key: string, newValue: unknown) => {
    setFiltersState((prev: FiltersState) => ({
      ...prev,
      [key]: newValue,
    }));
  };
  const filterSchema: FilterSchema[] = [
    {
      type: FilterFieldTypes.dateRange,
      id: FiltersKeys.dateRange,
      onChange: (value) => onChangeFilter(FiltersKeys.dateRange, value),
      className: STRINGS.EMPTY_STRING,
    },
  ];
  return (
    <>
      <Filters
        handleClearSearch={() => setSearch('')}
        handleSearch={debounceSearch}
        showSearch={false}
        filterSchema={filterSchema}
        handleApply={handleApplyFilters}
        showDateFilterTabs
        setFiltersState={setFiltersState}
        filtersState={filtersState}
      />
      <div className="row dashboad-cards">
        {cardData?.map((card) => (
          <Link
            to={card?.redirectionRoute || ''}
            key={card?.label}
            className="col-lg-3 col-sm-6 col-xl-3 mb-4"
          >
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
