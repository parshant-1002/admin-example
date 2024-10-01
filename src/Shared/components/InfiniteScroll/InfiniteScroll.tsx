import { Virtuoso } from 'react-virtuoso';

interface FooterProps {
  context?: {
    loadMore: () => void;
    loading: boolean;
    hasMore: boolean;
  };
}

function Footer({ context }: Readonly<FooterProps>) {
  if (!context) return null;

  const { loadMore, loading, hasMore } = context;

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {hasMore ? (
        <button type="button" disabled={loading} onClick={loadMore}>
          {loading ? 'Loading...' : 'Press to load more'}
        </button>
      ) : (
        <p>No more data to load</p>
      )}
    </div>
  );
}

interface InfiniteScrollProps<T> {
  loadMore: () => void;
  content: (index: number, item: T) => JSX.Element;
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  height?: string;
}

function InfiniteScroll<T>({
  data,
  isLoading,
  content,
  loadMore,
  hasMore,
  height = '300px',
}: Readonly<InfiniteScrollProps<T>>) {
  return (
    <Virtuoso
      style={{ height }}
      data={data}
      context={{ loading: isLoading, loadMore, hasMore }}
      increaseViewportBy={200}
      endReached={() => {
        if (hasMore) {
          loadMore();
        }
      }}
      itemContent={content}
      components={{
        Footer,
      }}
    />
  );
}

export default InfiniteScroll;
