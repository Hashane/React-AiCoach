function Sidebar() {
  return (
    <div
      className="bg-secondary text-white p-3 border-end border-dark"
      style={{ width: "250px", minHeight: "100%" }}
    >
      <h5>Conversations</h5>
      <ul className="list-unstyled">
        <li>Conversation 1</li>
        <li>Conversation 2</li>
      </ul>
    </div>
  );
}

export default Sidebar;
