import "./index.css";

function Tabs({ tabs, onClick }) {
  return (
    <ul className="tabs">
      {tabs.map((tab) => (
        <li className="tab" onClick={() => onClick(tab.name)}>
          {tab.name}
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
