interface DetailsItem {
  label?: string;
  value?: string;
}

interface DetailsCardProps {
  details?: DetailsItem[];
  className?: string;
  itemClassName?: string;
}

function DetailsCard({
  details = [],
  className = '',
  itemClassName = '',
}: DetailsCardProps) {
  return (
    <div className={`card mb-3 ${className}`}>
      <div className="card-body row">
        {details.map(({ label, value }) => (
          <div
            className={`${
              itemClassName || 'col-lg-2 col-md-3 col-sm-4'
            } text-center  my-1`}
            key={label}
          >
            <h6>{label}</h6>
            <p>{value || '-.-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsCard;
