import { Link } from "react-router-dom";
import { Menu, Package2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navList } from "./Header";

const MobileNavigationMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu
          className={`h-9 w-9 shrink-0 md:hidden border-[1px] hover:bg-accent
            border-accent-foreground/25 p-2 rounded-md`}
        />
      </SheetTrigger>
      <SheetContent side="left">
        {/* do not remove title */}
        <SheetTitle />
        <SheetDescription className="grid gap-3 text-lg font-medium">
          <Link
            to="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navList.map((nav) => (
            <Link
              to={nav.path}
              key={nav.path}
              className={`p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent`}
            >
              <SheetTrigger className="w-[100%] text-left">
                {nav.title}
              </SheetTrigger>
            </Link>
          ))}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenu;
