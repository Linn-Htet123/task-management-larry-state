import Layout from "@/Layout";
import Board from "@/pages/Board/Board";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const RoutePortal = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Board />} />
            <Route element={<Board />} path="/board" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default RoutePortal;
