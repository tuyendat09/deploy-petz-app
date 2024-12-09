interface FeedbackItemProps {
  name: string;
  date: string;
  review: string;
}

export default function FeedbackItem({
  name,
  date,
  review,
}: FeedbackItemProps) {
  return (
    <div>
      <div>{review}</div>
      <div className="mt-4">
        <h4>
          <span className="font-bold">{name}</span> - 5 sao
          <p className="text-[14px]">Ngày: {date}</p>
        </h4>
      </div>
    </div>
  );
}
