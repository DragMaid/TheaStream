export default function Button({
  onClick,
  children,
  className = "",
  type = "button",
  variant = "",
  size = "",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  variant?: string;
  size?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "p-2 rounded-full transition " + className
      }
    >
      {children}
    </button>
  );
}
