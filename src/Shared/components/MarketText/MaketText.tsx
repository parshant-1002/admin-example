import { TEXT_TYPES } from '../../constants/constants';

interface MarketTextType {
  text: string;
  type: string;
}

function MarketText({ text, type }: MarketTextType) {
  switch (type) {
    case TEXT_TYPES.SUCCESS:
      return <span className="text-green">{text}</span>;
    case TEXT_TYPES.DANGER:
      return <span className="text-danger">{text}</span>;
    case TEXT_TYPES.PENDING:
      return <span className="text-warning">{text}</span>;
    default:
      <span className="text-green">{text}</span>;
      break;
  }
}

export default MarketText;
