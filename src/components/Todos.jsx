/* eslint-disable react/prop-types */

const Todo = ({
  todos,
  activeTab,
  handleCompleted,
  handleEdit,
  handleDelete,
}) => {
  return (
    <ul>
      {todos
        .filter((todo) => {
          if (activeTab === "completed") return todo.completed;
          if (activeTab === "uncompleted") return !todo.completed;
          return true;
        })
        .map((todo) => {
          return (
            <li key={todo.id} className={`${todo.completed ? "check" : ""}`}>
              <p>{todo.title}</p>
              <div className="todo">
                <button
                  className={`completed ${todo.completed ? "green" : ""}`}
                  onClick={() => handleCompleted(todo.id)}
                >
                  {todo.completed ? (
                    <i className="fa-regular fa-square-check"></i>
                  ) : (
                    <i className="fa-regular fa-square"></i>
                  )}
                </button>
                <button className="edit" onClick={() => handleEdit(todo)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="del" onClick={() => handleDelete(todo.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Todo;
