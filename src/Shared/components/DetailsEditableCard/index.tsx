import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ProductDetailResponsePayload } from '../../../Views/Auction/AuctionDetails/Helpers/Model';
import {
  AuctionDetailsColumnData,
  DetailType,
} from '../../../Views/Auction/AuctionDetails/Helpers/constants';
// import { actions } from '../../../assets';

const styles = {
  container: {
    border: '1px solid #000',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    color: 'black',
  },
  table: {
    display: 'table' as const,
    width: '100%',
  },
  row: {
    display: 'table-row' as const,
  },
  cell: {
    display: 'table-cell' as const,
    padding: '5px',
    border: '1px solid #000',
    textAlign: 'center' as const,
  },
  icon: {
    width: '20px',
    height: '20px',
  },
  input: {
    width: '100%',
    padding: '5px',
    textAlign: 'center' as const,
  },
};

type DetailsWrapperCardProps = {
  details: ProductDetailResponsePayload;
  dataScema: AuctionDetailsColumnData[];
};

// Helper function to format keys (convert camelCase or underscores to readable text)

// Helper function to render values, handling different types of content
const renderValue = (
  value: React.ReactNode,
  columnSchema: AuctionDetailsColumnData,
  onChange: (newValue: string | number) => void
): JSX.Element | React.ReactNode => {
  if (columnSchema.isEditable)
    switch (columnSchema.type) {
      case DetailType.String:
      case DetailType.Number: {
        return (
          <input
            type={typeof value === 'number' ? 'number' : 'text'}
            value={value as string | number}
            onChange={(e) =>
              onChange(
                typeof value === 'number' ? +e.target.value : e.target.value
              )
            }
            style={styles.input}
          />
        );
      }
      case DetailType.Date: {
        return (
          <input
            type="date"
            data-date=""
            data-date-format="DD MMMM YYYY"
            value="2015-08-09"
          />
        );
      }
      case DetailType.Dropdown: {
        const submenu = columnSchema.options?.map((item) => ({
          buttonLabel: item.label,
          id: item.value,
          buttonAction: () => {},
        }));
        return (
          <Dropdown>
            <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
              <span className="text-primary">
                {columnSchema.options?.find((ele) => ele.value === value)
                  ?.label || ''}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {submenu?.length &&
                submenu.map((item) => (
                  <Dropdown.Item
                    key={item.buttonLabel}
                    onClick={item.buttonAction}
                    className="primary"
                  >
                    {item.buttonLabel}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        );
      }
      default:
        return '--';
    }

  if (typeof value === 'boolean') {
    return <input type="checkbox" checked={value} readOnly />;
  }

  if (typeof value === 'string' && value.startsWith('http')) {
    return <img src={value} alt="icon" style={styles.icon} />;
  }

  return value;
};

function DetailsWrapperEditableCard({
  details,
  dataScema,
}: DetailsWrapperCardProps) {
  const [data, setData] = useState(details);
  useEffect(() => {
    setData(details);
  }, [details]);
  const handleValueChange = (
    newValue: string | number,
    key: keyof ProductDetailResponsePayload
  ) => {
    const updatedData = { ...data, [key]: newValue };
    setData(updatedData);
  };

  const getColumnValue = useCallback(
    (rows: ProductDetailResponsePayload, column: AuctionDetailsColumnData) => {
      if (column.render && column.fieldName) {
        return column.render(
          rows,
          rows[column.fieldName as keyof ProductDetailResponsePayload]
        );
      }
      if (
        typeof rows[column.fieldName as keyof ProductDetailResponsePayload] ===
        'number'
      ) {
        return rows[column.fieldName as keyof ProductDetailResponsePayload];
      }
      return (
        rows[column.fieldName as keyof ProductDetailResponsePayload] || '-'
      );
    },
    []
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="row border p-3">
        {dataScema.map((field) => (
          <div key={field.title} className="col-md-3 mb-3">
            <h5 className="font-weight-bold">{field.title}</h5>
            <p>
              {' '}
              {renderValue(getColumnValue(data, field), field, (newValue) =>
                handleValueChange(
                  newValue,
                  field.fieldName as keyof ProductDetailResponsePayload
                )
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsWrapperEditableCard;
