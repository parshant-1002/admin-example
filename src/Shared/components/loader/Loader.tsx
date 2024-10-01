import { useSelector } from 'react-redux';
import './loader.scss';

// Define the RootState type according to your Redux store structure
interface RootState {
  loader: {
    isLoading: boolean;
  };
}

function Loader() {
  // Use the RootState type for useSelector
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loaderModal position-fixed">
      <div className="loader" />
    </div>
  );
}

export default Loader;
