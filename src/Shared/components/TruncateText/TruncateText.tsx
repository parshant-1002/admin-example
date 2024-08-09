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
    <span className="d-flex">
      <span>{displayText}</span>
      <button
        type="button"
        className="copy_icon"
        onClick={() => copyToClipboard(text)}
      >
        <i className="bi bi-copy" />
      </button>
    </span>
  );
}

export default TruncatedText;
