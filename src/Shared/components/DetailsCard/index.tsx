type Item = {
  title: string;
  value: string | number;
};

type DetailesWrapperCardProps = {
  details: Item[];
};

function DetailesWrapperCard({ details }: DetailesWrapperCardProps) {
  return (
    <div className="auction-item">
      <div className="auction-item-header">
        {details.map((item: Item) => (
          <div className="auction-item-info" key={item.title}>
            <div className="auction-item-price">
              {item.title} : {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailesWrapperCard;
