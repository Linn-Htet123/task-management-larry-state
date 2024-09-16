import "./App.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "react-modern-drawer/dist/index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import RoutePortal from "./routes/RoutePortal";

function App() {
  return (
    <Router>
      <ToastContainer />
      <RoutePortal />
    </Router>
  );
}

export default App;
