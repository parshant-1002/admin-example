import Skeleton from 'react-loading-skeleton';

export default function Shimmer({ height = '100%', width = '100%', ...props }) {
  return <Skeleton style={{ height, width, ...props }} />;
}
