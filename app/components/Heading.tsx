// /app/components/Heading.tsx

interface HeadingProps {
  text: string;
  color: string; // This will accept the color of the heading (e.g., 'text-heading' or 'text-dark-heading')
  className?: string; // Optional additional classes
}

const Heading = ({ text, color, className = "" }: HeadingProps) => {
  return (
    <h1
      className={`text-center text-2xl md:text-4xl font-bold ${color} ${className}`}
    >
      {text}
    </h1>
  );
};

export default Heading;
