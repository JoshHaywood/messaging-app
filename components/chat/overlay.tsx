export default function Overlay(props: {
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { onClick } = props;
  return (
    <div
      onClick={() => onClick && onClick(false)}
      className="fixed inset-0 bg-gray-800 opacity-75"
    ></div>
  );
}
