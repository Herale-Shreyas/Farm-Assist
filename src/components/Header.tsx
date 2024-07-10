import { Link, useLocation } from "react-router-dom";
import { CircleUser, Package2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DesktopNavigationMenu from "./DesktopNavigationMenu";
import MobileNavigationMenu from "./MobileNavigationMenu";
import { useAuth } from "./contexts/Auth";

const navList = [
  { title: "Home", path: "/" },
  { title: "Weather", path: "/weather.report" },
  { title: "Crop Assist AI", path: "/crop.adviser.ai" },
  { title: "Crop Diseases AI", path: "/crop.disease.ai" },
];

const Header = () => {
  const { USER, logout } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo =
    searchParams.get("redirectTo") ||
    (location.pathname.includes("auth") ? "/" : location.pathname);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">FarmAssist</span>
        </Link>
        {/* Desktop Navigation */}
        <DesktopNavigationMenu />
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigationMenu />

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {USER && (
              <Link to={`/profile`}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
            )}
            <Link to={`/settings`}>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <Link to={`/support`}>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {!USER && (
              <>
                <Link to={`/auth.register?redirectTo=${redirectTo}`}>
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
                <Link to={`/auth.login?redirectTo=${redirectTo}`}>
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
              </>
            )}
            {USER && (
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
export { navList };
