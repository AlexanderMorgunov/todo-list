import { Menu } from "antd";
import "./MenuOfTask.css";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useFirebase } from "../../hooks/useFirebase";
import { useAuth } from "../../hooks/use-auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { setFilter } from "../../store/slices/FilterSlice";
import { TaskContext } from "../../providers/TaskProvider";
import { useContext } from "react";
import moment from "moment";

const MenuOfTask = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const { writeTaskData, removeAllDataFireBase } = useFirebase();
  const { userId, isAuth } = useAuth();

  const dispatch = useDispatch();

  const getId = () => nanoid(8);

  const OnClick = (e) => {
    switch (e.key) {
      case "1":
        const newTask = {
          id: getId(),
          date: moment(new Date()).format("MMMM Do YYYY, h:mm a"),
          title: "",
          description: "",
          status: "active",
          fontSize: "20",
          isAttach: false,
        };
        if (isAuth) writeTaskData({ ...newTask, userId });
        setTasks((tasks) => [...tasks, newTask]);
        break;
      case "2":
        dispatch(setFilter("active"));
        break;
      case "3":
        dispatch(setFilter("done"));
        break;
      case "4":
        if (isAuth) removeAllDataFireBase();
        setTasks((tasks) => []);

        break;
      default:
        throw new Error("No such button");
    }
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      className="MenuOfTask-menu"
      defaultSelectedKeys={["1"]}
      items={[
        { key: 1, label: "Новая заметка" },
        { key: 2, label: "Активные заметки" },
        { key: 3, label: "Завершенные" },
        { key: 4, label: "Удалить все заметки" },
      ]}
      onClick={OnClick}
    />
  );
};

export default MenuOfTask;
