import { useLocation, useNavigate } from "react-router-dom";
import { tw } from "twind";
import NotesIcon from "@mui/icons-material/Notes";

const adminOptions = [
  {
    title: "Todos",
    icon: <NotesIcon className={tw("!text-xl")} />,
    link: "/dashboard",
  },
];

const DashboardBoardOptions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={tw("flex flex-col gap-2")}>
      {adminOptions.map((option, idx) => (
        <div
          key={idx}
          className={tw(
            "items-center py-2 cursor-pointer flex gap-4 text-xs sm:text-sm px-4 md:py-3 md:px-6",
            option.link === pathname && "bg-[#DC3545] !text-white"
          )}
          onClick={() => navigate(option.link)}
        >
          {option.icon}
          <p className={tw("font-medium")}>{option.title}</p>
        </div>
      ))}
    </div>
  );
};

export const Sidebar = ({ active }: any) => {
  return (
    <div
      className={tw(
        "w-0 transition-all z-30 bg-white md:shadow-none! md:min-w-[200px] h-full max-w-[220px] flex flex-col gap-6 md:w-full! absolute md:relative overflow-hidden",
        active && "!w-[220px]",
        active && "shadow-lg"
      )}
    >
      <DashboardBoardOptions />
    </div>
  );
};
