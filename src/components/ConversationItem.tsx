type Props = {
  title: string;
  active: boolean;
  onClick: () => void;
};

function ConversationItem({ title, active, onClick }: Props) {
  return (
    <li
      className={`py-2 px-3 rounded ${
        active ? "bg-dark text-white" : "text-light"
      } cursor-pointer`}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {title}
    </li>
  );
}

export default ConversationItem;
