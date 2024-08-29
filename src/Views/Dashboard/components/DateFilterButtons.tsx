/* eslint-disable no-multi-assign */
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import Button from '../../../Shared/components/form/Button';
import { FILTER_CONSTS } from '../../../Shared/constants';

// Constants for button labels
const TODAY = 'Today';
const YESTERDAY = 'Yesterday';
const SEVEN_DAYS = '7 days';
const THIS_MONTH = 'This month';
const LAST_MONTH = 'Last month';
const THIS_YEAR = 'This year';

const BUTTON_LABELS = [
  TODAY,
  YESTERDAY,
  SEVEN_DAYS,
  THIS_MONTH,
  LAST_MONTH,
  THIS_YEAR,
] as const;

type ButtonLabel = (typeof BUTTON_LABELS)[number];

function DateFilterButtons({
  handleApply,
  activeDateButtonIndex,
  setActiveDateButtonIndex,
}: {
  handleApply: (filter: FiltersState) => void;
  activeDateButtonIndex: number | null;
  setActiveDateButtonIndex: Dispatch<SetStateAction<number | null>>;
}) {
  const handleDateChange = (type: ButtonLabel, index: number) => {
    let fromDate: string;
    let toDate: string;
    const today = moment().format('YYYY-MM-DD');
    setActiveDateButtonIndex(index);
    switch (type) {
      case TODAY:
        fromDate = toDate = today;
        break;
      case YESTERDAY:
        fromDate = toDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case SEVEN_DAYS:
        fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        toDate = today;
        break;
      case THIS_MONTH:
        fromDate = moment().startOf('month').format('YYYY-MM-DD');
        toDate = today;
        break;
      case LAST_MONTH:
        fromDate = moment()
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYY-MM-DD');
        toDate = moment()
          .subtract(1, 'month')
          .endOf('month')
          .format('YYYY-MM-DD');
        break;
      case THIS_YEAR:
        fromDate = moment().startOf('year').format('YYYY-MM-DD');
        toDate = today;
        break;
      default:
        fromDate = toDate = today;
    }
    handleApply({
      startDate: moment(fromDate).format(FILTER_CONSTS.dateFormat),
      endDate: moment(toDate).format(FILTER_CONSTS.dateFormat),
    });
  };

  return (
    <div>
      <div className="button-group dy_group_wrapper">
        {BUTTON_LABELS.map((label, index) => (
          <Button
            key={label}
            btnType={activeDateButtonIndex === index ? 'primary' : 'secondary'}
            className="btn btn-sm btn-danger onlyIcon"
            onClick={() => handleDateChange(label, index)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DateFilterButtons;
