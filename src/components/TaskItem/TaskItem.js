import { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider";
import { useAuth } from "../../hooks/use-auth";
import { useFirebase } from "../../hooks/useFirebase";
import { Popover } from "antd";
import "./TaskItem.css";

const TaskItem = ({
  date,
  description,
  fontSize,
  id,
  isAttach,
  status,
  title,
}) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { writeTaskData, deleteTaskData } = useFirebase();
  const { isAuth } = useAuth();

  const [isChanged, setIsChanged] = useState(false);
  const [taskStatus, setTaskStatus] = useState(status);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const deleteTask = () => {
    setTasks((tasks) => tasks.filter((el) => el.id !== id));
    deleteTaskData(id);
    setOpen(false);
  };

  const markTaskAsDone = () => {
    setTasks((tasks) =>
      tasks.map((el) => {
        if (el.id === id) {
          return (el.status = "done");
        } else return el;
      })
    );
    writeTaskData(tasks.find((el) => el.id === id));
    setTaskStatus("done");
  };

  return (
    <Popover
      content={
        <>
          <a onClick={deleteTask}>Удалить</a>
          <br />
          <a onClick={markTaskAsDone}>Пометить как выполненное</a>
          <br />
          <a onClick={hide}>Close</a>
          <br />
        </>
      }
      trigger="contextMenu"
      open={open}
      placement="left"
      onOpenChange={handleOpenChange}
    >
      <div className="TaskItem-wrapper">
        {date}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target[0].value;
            const description = e.target[1].value;
            const changedTask = {
              ...tasks.find((el) => el.id === id),
              title,
              description,
            };
            if (isAuth) writeTaskData({ ...changedTask });
            setTasks((tasks) => [
              ...tasks.filter((el) => el.id !== id),
              changedTask,
            ]);
            setIsChanged(false);
          }}
        >
          <input
            name="FormTitle"
            onChange={() => setIsChanged(true)}
            type="text"
            defaultValue={title}
            placeholder={"Заголовок"}
            style={{ fontSize: `${fontSize}px` }}
            className="FormTitle"
          />
          <textarea
            name="FormDescription"
            cols="30"
            rows="10"
            defaultValue={description}
            style={{ fontSize: `${fontSize}px` }}
            className="FormDescription"
            onChange={() => setIsChanged(true)}
            placeholder={"Описание"}
          ></textarea>
          {isChanged ? (
            <>
              <button type="submit" className="FormBtn">
                Сохранить
              </button>
              {!isAuth ? (
                <p style={{ fontSize: "11px", color: "red" }}>
                  Внимание данные не сохраняются без входа в ЛК
                </p>
              ) : null}
            </>
          ) : null}
        </form>
      </div>
    </Popover>
  );
};

export default TaskItem;
