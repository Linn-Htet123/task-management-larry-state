import "./App.css";
import "react-responsive-modal/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "react-modern-drawer/dist/index.css";
import { ToastContainer } from "react-toastify";

import RoutePortal from "./routes/RoutePortal";

function App() {
  return (
    <div>
      <ToastContainer />
      <RoutePortal />
    </div>
  );
}

export default App;
