/* eslint-disable react/prop-types */
import Prototype from "prop-types";

const AddTodo = ({ inputValue, handleInputChange, handleAdd }) => {
  return (
    <div className="title">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button className="add" onClick={handleAdd}>
        ADD
      </button>
    </div>
  );
};

export default AddTodo;

AddTodo.prototypes = {
  inputValue: Prototype.any,
  handleInputChange: Prototype.func,
  handleAdd: Prototype.func,
};
