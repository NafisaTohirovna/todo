/* eslint-disable react/prop-types */

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === "all" ? "active" : ""}
        onClick={() => setActiveTab("all")}
      >
        All
      </button>
      <button
        className={activeTab === "completed" ? "active" : ""}
        onClick={() => setActiveTab("completed")}
      >
        Completed
      </button>
      <button
        className={activeTab === "uncompleted" ? "active" : ""}
        onClick={() => setActiveTab("uncompleted")}
      >
        Uncompleted
      </button>
    </div>
  );
};

export default Tabs;
