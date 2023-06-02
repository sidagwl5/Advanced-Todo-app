import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { tw } from "twind";
import { UserPopup } from "./UserPopup";

const MenuOptions = () => {
  return <UserPopup />;
};

export const Navbar = ({ handleSidebar = [] }: any) => {
  const [sidebar, setSidebar] = handleSidebar;
  const isTablet = useMediaQuery("(max-width:1023.50px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isTablet);
  }, [isTablet]);

  return (
    <header className={tw("sticky border-b shadow-lg top-0 z-40 bg-white")}>
      <section
        className={tw(
          "px-4 lg:px-7 h-14 w-full gap-[6vw] flex justify-between items-center mx-auto"
        )}
      >
        {setSidebar && (
          <IconButton
            onClick={setSidebar?.bind(this, !sidebar)}
            className={tw("transition-all md:!hidden", sidebar && "rotate-180")}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
        <div />

        <div
          onClick={setOpen.bind(this, !open)}
          className={tw("cursor-pointer lg:hidden")}
        >
          <MenuIcon />
        </div>

        <div className={tw("header-right hidden", "lg:!flex")}>
          <div className={tw("flex items-center gap-6")}>
            <MenuOptions />
          </div>
        </div>
      </section>

      <section
        className={tw(
          "relative w-full flex flex-col gap-3 overflow-hidden bg-white items-end px-4 lg:px-7 transition-all",
          !open ? "h-0" : "py-6"
        )}
      >
        <div className={tw("flex items-center justify-end gap-6 flex-wrap")}>
          <MenuOptions />
        </div>
      </section>
    </header>
  );
};
