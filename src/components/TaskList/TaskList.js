import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";
import { useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { useFirebase } from "../../hooks/useFirebase";
import { useAuth } from "../../hooks/use-auth";
import { Typography } from "antd";
import { TaskContext } from "../../providers/TaskProvider";

const { Title } = Typography;

const TaskList = ({ children }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { isAuth } = useAuth();
  const { getTasksFromFireBase } = useFirebase();

  const filter = useSelector((state) => state.filter.filter);

  useEffect(() => {
    if (isAuth) {
      getTasksFromFireBase().then((data) =>
        setTasks((tasks) => data.filter((el) => el.status === filter))
      );
    }
  }, [isAuth, filter]);

  const renderTaskList = (arr) => {
    if (arr.length === 0) {
      return (
        <>
          <Title level={2}>Список заметок пуст</Title>
        </>
      );
    }

    return arr.map(({ ...props }) => {
      return (
        <>
          <TaskItem key={props.id} {...props} />
        </>
      );
    });
  };

  const elements = renderTaskList(tasks);

  return <div className="TaskListWrapper">{elements}</div>;
};

export default TaskList;
