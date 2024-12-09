interface ProductContainerProps {
  children: React.ReactNode;
  cols?: number;
}

export default function ProductContainer({
  children,
  cols = 3,
}: ProductContainerProps) {
  return <div className={`mt-8 grid grid-cols-${cols} gap-4`}>{children}</div>;
}
