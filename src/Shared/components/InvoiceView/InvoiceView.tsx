import { Tooltip } from 'react-tooltip';
import { InvoiceIcon } from '../../../assets';
import { STRINGS } from '../../constants';
import Button from '../form/Button';

export interface InvoiceURLData {
  invoiceURL?: string;
  _id?: string;
}

interface InvoiceProps {
  data: InvoiceURLData;
  handleInvoice: () => void;
  disabled?: boolean;
  tooltipLabel?: string;
}
export default function InvoiceView({
  data,
  handleInvoice,
  disabled,
  tooltipLabel = STRINGS.PRODUCT_NOT_PURCHASED,
}: InvoiceProps) {
  return (
    <div className="text-center" data-tooltip-id={disabled ? data?._id : ''}>
      <Tooltip
        id={data?._id}
        place="top-end"
        className="bg-primary text-white p-3 border border-rounded tool-tip"
        opacity={1}
      >
        {tooltipLabel}
      </Tooltip>
      {data?.invoiceURL ? (
        <button
          type="button"
          className="btn btn44 btn-primary"
          onClick={() => window.open(data?.invoiceURL, '_blank')}
        >
          <img src={InvoiceIcon} alt="" />
        </button>
      ) : (
        <Button onClick={handleInvoice} disabled={disabled}>
          {STRINGS.GENERATE}
        </Button>
      )}
    </div>
  );
}
