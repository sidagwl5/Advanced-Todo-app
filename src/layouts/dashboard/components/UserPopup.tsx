import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Popover } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";

const MenuItem = ({ icon, title, onClick }: any) => {
  return (
    <div
      onClick={onClick}
      className={
        "w-full h-9 flex gap-2 text-sm cursor-pointer items-center px-4"
      }
    >
      <div>{icon}</div>
      {title}
    </div>
  );
};

export const UserPopup = () => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        ref={anchorEl}
        className={"flex items-center gap-2 cursor-pointer"}
      >
        {/* <Image
          className={"w-10 h-10 rounded-full"}
          src="./images/profile.png"
          alt="profile"
        /> */}

        <ArrowDropDownOutlinedIcon />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={setOpen.bind(this, false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{
          paper: "bg-yellow-400 mt-1.5 rounded-md! p-1!",
        }}
      >
        <MenuItem title="Profile" />

        <hr className={"border-gray-200"} />
        <MenuItem title="Logout" />
      </Popover>
    </>
  );
};
