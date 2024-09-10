import { SideBarItemType } from "@/types/sidebar";
import SidebarItem from "./SideBarItem";

interface Props {
  title: string;
  menuItems: SideBarItemType[];
  className?: string;
}
const Sidebar = ({ title, menuItems, className = "" }: Props) => {
  return (
    <div
      className={`relative flex flex-col bg-white text-gray-700 h-[calc(100dvh)] w-full max-w-[18rem] p-4 border-r border-slate-100 ${className}`}
    >
      <div className="mb-2 pb-4 px-2 border-b border-slate-100">
        <h4 className="text-xl font-semibold text-center">{title}</h4>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 text-base font-normal text-gray-700">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            active={item.active}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
