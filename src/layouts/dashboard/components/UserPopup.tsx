import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Popover } from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { tw } from "twind";
import { useGlobalContext } from "../../../GlobalContext";
import { useNavigate } from "react-router";

const MenuItem = ({
  icon,
  title,
  onClick,
}: {
  icon?: ReactNode;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={tw(
        "w-full h-9 flex gap-2 text-sm cursor-pointer items-center px-4"
      )}
    >
      <div>{icon}</div>
      {title}
    </div>
  );
};

export const UserPopup = () => {
  const navigate = useNavigate();
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    handleUser: [user, setUser],
  } = useGlobalContext();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    navigate("/login");
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        ref={anchorEl}
        className={"flex items-center gap-1 cursor-pointer"}
      >
        <p>{user?.username}</p>

        <ArrowDropDownOutlinedIcon className={tw(open && "rotate-180")} />
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl.current}
        onClose={setOpen.bind(this, false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{
          paper: tw("mt-1.5 -ml-3 rounded-md! p-1!"),
        }}
      >
        <MenuItem onClick={logout} title="Logout" />
      </Popover>
    </>
  );
};
