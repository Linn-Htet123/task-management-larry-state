import Layout from "@/Layout";
import Board from "@/pages/Board/Board";
import TaskDetails from "@/pages/Task/TaskDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const RoutePortal = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Board />} />
            <Route element={<Board />} path="/board" />
            <Route element={<TaskDetails />} path="/task/:id" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default RoutePortal;
