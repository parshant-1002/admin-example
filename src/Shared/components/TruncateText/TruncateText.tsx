import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { Copy } from '../../../assets';
import './style.scss';

// Define props type for TruncatedText
interface TruncatedTextProps {
  text: string | number; // Assuming text is always a string
}
const copyToClipboard = async (
  value?: string | number | undefined
): Promise<void> => {
  try {
    if (!value) return;
    await navigator.clipboard.writeText(`${value}`);
    toast.success('Copied to clipboard');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Failed to copy text to clipboard: ${error.message}`);
    } else {
      toast.error('An unknown error occurred');
    }
  }
};

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
            className="bg-primary text-white p-3 border border-rounded tool-tip"
            place="top"
          >
            <div className="tool-tip-content">{text}</div>
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
