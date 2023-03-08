import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Spinner from "./components/Spinner/Spinner";
import TaskList from "./components/TaskList/TaskList";
import { TaskProvider } from "./providers/TaskProvider";

function App() {
  return (
    <TaskProvider>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TaskList />} />
          </Route>
        </Routes>
      </Suspense>
    </TaskProvider>
  );
}

export default App;
