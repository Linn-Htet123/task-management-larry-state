import { Outlet } from "react-router-dom";
import menuItems from "./components/common/sidebar/menuItem";
import Sidebar from "./components/common/sidebar/SideBar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <aside className="sticky top-0 h-screen bg-white border-r border-slate-100">
        <Sidebar title="TASK MANAGEMENT" menuItems={menuItems()} />
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
