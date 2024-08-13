import { useCallback, useState } from 'react';
import { AuctionDetailsColumnData } from '../../../Views/Auction/helpers/constants';

export type Item = {
  title: string;
  value: string | number | boolean | any;
  editable?: boolean; // Added editable flag
  type: string;
};

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
  details: Item[];
  columns: AuctionDetailsColumnData[];
};

// Helper function to format keys (convert camelCase or underscores to readable text)
const formatKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());
};

// Helper function to render values, handling different types of content
const renderValue = (
  value: string | number | boolean,
  editable: boolean | undefined,
  onChange: (newValue: string | number) => void
): JSX.Element | string | number => {
  if (editable) {
    return (
      <input
        type={typeof value === 'number' ? 'number' : 'text'}
        value={value as string | number}
        onChange={(e) =>
          onChange(typeof value === 'number' ? +e.target.value : e.target.value)
        }
        style={styles.input}
      />
    );
  }

  if (typeof value === 'boolean') {
    return <input type="checkbox" checked={value} readOnly />;
  }

  if (typeof value === 'string' && value.startsWith('http')) {
    return <img src={value} alt="icon" style={styles.icon} />;
  }

  return value;
};

function DetailsWrapperCard({ details, columns }: DetailsWrapperCardProps) {
  const [data, setData] = useState(details);

  const handleValueChange = (index: number, newValue: string | number) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    setData(updatedData);
  };

  const getColumnValue = useCallback(
    (data: any, column: AuctionDetailsColumnData) => {
      if (column.render) {
        return column.render(data, data[column?.fieldName || '']);
      }
      if (typeof data[column?.fieldName || ''] === 'number') {
        return data[column?.fieldName || ''];
      }
      return data[column?.fieldName || ''] || '-';
    },
    []
  );

  return (
    <div style={styles.container}>
      <h3>Auction Details</h3>
      <div style={styles.table}>
        {columns.map((item, index) => (
          <div style={styles.row} key={`id_${index}`}>
            <div style={styles.cell}>
              <strong>{formatKey(item.title || '')}</strong>
            </div>
            <div style={styles.cell}>
              {renderValue(
                getColumnValue(data, item),
                item.isEditable,
                (newValue) => handleValueChange(index, newValue)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsWrapperCard;
