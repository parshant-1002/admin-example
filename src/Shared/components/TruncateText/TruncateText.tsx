import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Copy } from '../../../assets';
import { copyToClipboard } from '../../utils/functions';
import './style.scss';

// Define props type for TruncatedText
interface TruncatedTextProps {
  text: string | number; // Assuming text is always a string
}

function TruncatedText({ text }: TruncatedTextProps) {
  const [tooltipId, setTooltipId] = useState('');

  useEffect(() => {
    // Generate a unique ID for each tooltip
    setTooltipId(`tooltip-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const maxLength = 20;
  const displayText =
    String(text).length > maxLength
      ? `${String(text).substring(0, maxLength)}...`
      : text;

  return (
    <span className="d-inline-flex">
      <span data-tooltip-id={tooltipId}>{displayText}</span>

      {String(text).length > maxLength ? (
        <>
          <Tooltip
            id={tooltipId}
            opacity={1}
            className="bg-primary text-white p-3 border border-rounded"
          >
            {text}
          </Tooltip>
          <button
            type="button"
            className="copy_icon"
            onClick={() => copyToClipboard(text)}
          >
            <img src={Copy} alt="" width={15} />
          </button>
        </>
      ) : null}
    </span>
  );
}

export default TruncatedText;
