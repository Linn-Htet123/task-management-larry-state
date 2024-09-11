import { SideBarItemType } from "@/types/sidebar";

const SidebarItem = ({ icon, label, onClick, active }: SideBarItemType) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg font-normal text-start leading-tight transition-all
          ${
            active
              ? "bg-secondary text-primary"
              : "hover:bg-secondary hover:bg-opacity-80 text-gray-700"
          }
          focus:bg-light focus:bg-opacity-80 active:bg-light active:bg-opacity-80 
          hover:text-primary focus:text-primary active:text-primary outline-none`}
    >
      <div className="grid place-items-center mr-4">{icon}</div>
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
