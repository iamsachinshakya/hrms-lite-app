interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: string | number;
}

export const Card = ({
  children,
  className = "",
  style,
  padding = 22,
}: CardProps) => {
  return (
    <div
      className={`card ${className}`}
      style={{
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
