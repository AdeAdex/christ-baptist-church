// /app/components/Heading.tsx

interface HeadingProps {
  text: string;
  color?: string;
  className?: string;
}

const Heading = ({ text, color, className = "" }: HeadingProps) => {
  return (
    <h1
      className={`text-center font-bold ${color} ${className}`}
    >
      {text}
    </h1>
  );
};

export default Heading;
