export default function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={
        "w-full resize-none p-3 pr-10 text-sm bg-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 " +
        (props.className || "")
      }
    />
  );
}