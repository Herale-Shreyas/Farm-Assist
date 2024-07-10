import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { navList } from "./Header";

const DesktopNavigationMenu = () => {
  const navigationMenuTriggerStyleModified = () =>
    `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background
      px-4 py-2 text-sm font-medium transition-colors text-accent-foreground/60 hover:bg-accent
      hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none
      disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50
      data-[state=open]:bg-accent/50`;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navList.map((nav) => (
          <NavigationMenuItem key={nav.title}>
            <Link
              to={nav.path}
              className={navigationMenuTriggerStyleModified()}
            >
              {nav.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigationMenu;
