import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { tw } from "twind";
import { UserPopup } from "./UserPopup";

const MenuOptions = () => {
  return (
    <>
      <div className="notification">
        <NotificationsIcon />
      </div>
      <UserPopup />
    </>
  );
};

export const Navbar = ({ handleSidebar = [] }: any) => {
  const [sidebar, setSidebar] = handleSidebar;
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isMobile);
  }, [isMobile]);

  return (
    <div className={tw("sticky shadow-md top-0 z-40 bg-white")}>
      <div
        className={tw(
          "max-w-[1440px] px-4 lg:px-7 h-14 w-full gap-[6vw] flex justify-between items-center mx-auto"
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
        <div className="header-left">
          {/* <Image
              onClick={() => navigate.push("/")}
              className={tw("cursor-pointer")}
              src="./images/logo.png"
              alt=""
            /> */}
        </div>

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
      </div>

      <div
        className={tw(
          "relative w-full flex flex-col gap-3 overflow-hidden bg-white items-end px-4 lg:px-7 transition-all",
          !open ? "h-0" : "py-6"
        )}
      >
        <div className={tw("flex items-center justify-end gap-6 flex-wrap")}>
          <MenuOptions />
        </div>
      </div>
    </div>
  );
};
