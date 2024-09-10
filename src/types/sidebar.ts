export interface SideBarItemType {
    id?: string | number;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    active: boolean;
}
