import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/TaskPage.css";
function TaskPage() {
  const [details, setDetails] = useState(-1);
  const [data, setData] = useState("");
  const [create, setCreate] = useState(false);
  const [editing,setIsEditing] = useState(false);
  const [updateRecords,setUpdatedRecords] = useState();
  const [tasks, setTasks] = useState([]);
  const [dependant,setDependent] = useState(true)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const viewDetails = (e)=>{
    setDetails(e.target.id)
  }
  const handleInputChangeForUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedRecords({ ...updateRecords, [name]: value });
  };
  useEffect(() => {
    axios.get("http://localhost:3001/getTask").then((data) => {
      setTasks(data.data.data);
    });
  }, [dependant]);
  
  const updateTask = () => {
    axios.post("http://localhost:3001/update", updateRecords).then((data) => {});
  };
  const deleteTask = (e) => {
    axios.post("http://localhost:3001/delete", tasks[e.target.id]).then((data) => {
      setDependent(!dependant)
    });
  };
  const update = (e)=>{
    setIsEditing(true)
    setUpdatedRecords(tasks[e.target.id])
    setData("")
  }
  const addTask = () => {
    axios.post("http://localhost:3001/data", data).then((data) => {
      setCreate(false)
      setDependent(!dependant)
    });
  };
  return (
    <div className="taskPage">
      <div>

      <h1>Your tasks:</h1>
      <button onClick={() => setCreate(true)}>Create new one</button>
      </div>
      {editing && <div className="createNewTask">
        <div>Title:
          <input
            name="title"
            placeholder="Title"
            value={updateRecords.title}
            type="text"
            disabled
          />
          </div>
          <div>

          Description:
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={updateRecords.description}
            onChange={handleInputChangeForUpdate}
            />
            </div>
            <div>

          Due Date:
          <input
            type="date"
            name="dueDate"
            value={updateRecords.dueDate}
            onChange={handleInputChangeForUpdate}
            />
            </div>
          <button onClick={updateTask}>Update</button>
        </div>}
      {!create ? (
        tasks.length > 0 &&
        tasks.map((task, i) => {
          return (
            <div className="task" id={i}>
              <div>
                <button id={i} onClick={update}>
                  🖋️ Edit
                </button>
                <button id={i} onClick={deleteTask}>
                  Delete
                </button>
              </div>

              <h1>{task.title}</h1>
              <button id={i} onClick={viewDetails}>
                View details
              </button>
              {details == i && <p>{task.description}</p>}
              <p>{task.duedate}</p>
            </div>
          );
        })
        
      ) : (
        <div className="createNewTask">
          <div>Title:
          <input
            name="title"
            placeholder="Title"
            value={data.title}
            type="text"
            onChange={handleInputChange}
          />
          </div>
          <div>

          Description:
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleInputChange}
            />
            </div>
            <div>

          Due Date:
          <input
            type="date"
            name="dueDate"
            value={data.dueDate}
            onChange={handleInputChange}
            />
            </div>
          <button onClick={addTask}>Create</button>
        </div>
      )}

    </div>
  );
}

export default TaskPage;
