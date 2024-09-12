import { useLocation, useNavigate } from "react-router-dom";
import { SideBarItemType } from "@/types/sidebar";
import BoardIcon from "@/icons/BoardIcon";

const menuItems = (): SideBarItemType[] => {
  const location = useLocation();
  const navigate = useNavigate();

  return [
    {
      id: 1,
      icon: <BoardIcon />,
      label: "Board",
      onClick: () => navigate("/board"),
      active: location.pathname === "/board" || location.pathname === "/",
    },
  ];
};

export default menuItems;
