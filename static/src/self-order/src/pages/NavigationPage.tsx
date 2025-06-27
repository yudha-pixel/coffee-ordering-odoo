import {UserUser} from "@/types";
import MenuItem from "@/components/MenuItem.tsx";
import {Store, ScrollText, UserCircle} from "lucide-react";

interface NavigationPageProps {
    user: UserUser | null;
    onClose: () => void;
}

export default function NavigationPage({onClose}: NavigationPageProps) {
    return (
        <div className="absolute h-[75%] w-1/2 flex flex-col z-0 top-1/12">
            <div className="flex w-full overflow-hidden">
                <div>
                    <MenuItem
                        icon={<Store /> }
                        title="New Order"
                        onClick={onClose}
                    />
                    <MenuItem
                        icon={<ScrollText /> }
                        title="Order History"
                        onClick={onClose}
                    />
                    <MenuItem
                        icon={<UserCircle /> }
                        title="Login/Register"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
}