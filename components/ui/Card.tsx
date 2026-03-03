interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: string | number;
  onClick?: () => void;
}

export const Card = ({
  children,
  className = "",
  style,
  padding = 22,
  onClick,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
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
