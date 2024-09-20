import moment, { unitOfTime } from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { FiltersState } from '../../../Shared/components/Filters/helpers/models';
import Button from '../../../Shared/components/form/Button';
import {
  DATE_FORMATS,
  FILTER_CONSTS,
} from '../../../Shared/constants/constants';
import { BUTTON_LABELS, DateRange } from '../helpers/constants';

interface DateFilterButtonsProps {
  handleApply: (filter: FiltersState) => void;
  activeDateButtonIndex: number | null;
  setActiveDateButtonIndex: Dispatch<SetStateAction<number | null>>;
}

function DateFilterButtons({
  handleApply,
  activeDateButtonIndex,
  setActiveDateButtonIndex,
}: Readonly<DateFilterButtonsProps>) {
  const handleDateChange = (type: string, index: number) => {
    const day = DateRange.DAY as unitOfTime.DurationConstructor;
    const month = DateRange.MONTH as unitOfTime.DurationConstructor;
    const year = DateRange.YEAR as unitOfTime.DurationConstructor;
    const sevenDays = DateRange.SEVEN_DAYS;
    const oneDay = DateRange.ONE_DAY;
    const today = moment();
    const formattedToday = today.format(DATE_FORMATS.DISPLAY_DATE_REVERSE);

    setActiveDateButtonIndex(index);

    let fromDate; // Default to today
    let toDate; // Default to today

    switch (type) {
      case BUTTON_LABELS.TODAY:
        fromDate = formattedToday;
        toDate = formattedToday;
        break;

      case BUTTON_LABELS.YESTERDAY: {
        const yesterday = today
          .clone()
          .subtract(oneDay, day)
          .format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        fromDate = yesterday;
        toDate = yesterday;
        break;
      }

      case BUTTON_LABELS.SEVEN_DAYS:
        fromDate = today
          .clone()
          .subtract(sevenDays, day)
          .format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        toDate = formattedToday;
        break;

      case BUTTON_LABELS.THIS_MONTH:
        fromDate = today
          .clone()
          .startOf(month)
          .format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        toDate = formattedToday;
        break;

      case BUTTON_LABELS.LAST_MONTH: {
        const lastMonthStart = today
          .clone()
          .subtract(oneDay, month)
          .startOf(month);
        const lastMonthEnd = today.clone().subtract(oneDay, month).endOf(month);
        fromDate = lastMonthStart.format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        toDate = lastMonthEnd.format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        break;
      }

      case BUTTON_LABELS.THIS_YEAR:
        fromDate = today
          .clone()
          .startOf(year)
          .format(DATE_FORMATS.DISPLAY_DATE_REVERSE);
        toDate = formattedToday;
        break;

      default:
        fromDate = formattedToday;
        toDate = formattedToday;
        break;
    }

    handleApply({
      startDate: moment(fromDate).format(FILTER_CONSTS.dateFormat),
      endDate: moment(toDate).format(FILTER_CONSTS.dateFormat),
    });
  };

  return (
    <div>
      <div className="button-group dy_group_wrapper">
        {Object.values(BUTTON_LABELS).map((label, index) => (
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
