import { Copy } from '../../../assets';
import { copyToClipboard } from '../../utils/functions';
import './style.scss';

// Define props type for TruncatedText
interface TruncatedTextProps {
  text: string | number; // Assuming text is always a string
}

function TruncatedText({ text }: TruncatedTextProps) {
  const maxLength = 20;
  const displayText =
    String(text).length > maxLength
      ? `${String(text).substring(0, maxLength)}...`
      : text;

  return (
    <span className="d-inline-flex">
      <span>{displayText}</span>
      {String(text).length > maxLength ? (
        <button
          type="button"
          className="copy_icon"
          onClick={() => copyToClipboard(text)}
        >
          <img src={Copy} alt="" width={15} />
        </button>
      ) : null}
    </span>
  );
}

export default TruncatedText;
