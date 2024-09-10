import { useLocation, useNavigate } from "react-router-dom";
import { SideBarItemType } from "@/types/sidebar";
import ProjectIcon from "@/icons/ProjectIcon";
import BoardIcon from "@/icons/BoardIcon";

const menuItems = (): SideBarItemType[] => {
  const location = useLocation();
  const navigate = useNavigate();

  return [
    {
      id: 1,
      icon: <ProjectIcon />,
      label: "Project",
      onClick: () => navigate("/project"),
      active: location.pathname === "/project",
    },
    {
      id: 2,
      icon: <BoardIcon />,
      label: "Board",
      onClick: () => navigate("/board"),
      active: location.pathname === "/board",
    },
  ];
};

export default menuItems;
