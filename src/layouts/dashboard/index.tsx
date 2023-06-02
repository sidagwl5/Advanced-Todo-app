import { tw } from "twind";
import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";
import { axiosInstance } from "../../configs/axios.config";
import { Button } from "../../ui/atoms/Button";
import Footer from "./components/Footer";

const DashboardLayout = () => {
  const {
    handleUser: [user, setUser],
  } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token)
      axiosInstance
        .get("/user/dummy-auth", { headers: { Authorization: token } })
        .then(({ data }) => {
          setUser(data);
        })
        .finally(() => setLoading(false));
    else setLoading(false);
  }, [setUser]);

  const isEligible = Boolean(user);

  return (
    <section className={tw("w-full flex flex-col relative h-screen")}>
      {isEligible ? (
        <>
          <Navbar handleSidebar={[sidebar, setSidebar]} />

          <Stack
            direction="row"
            justifyContent="space-between"
            position={"relative"}
            flex={1}
          >
            <Sidebar active={sidebar} />

            <div
              className={tw(
                "flex flex-col flex-1 overflow-hidden min-w-0 bg-[#f9f9f9] p-4 md:p-6 gap-8"
              )}
            >
              <Outlet />
            </div>
          </Stack>
        </>
      ) : (
        <div
          className={tw(
            "w-full flex-col gap-3 h-full justify-center items-center flex"
          )}
        >
          {loading ? (
            <>
              <CircularProgress size={24} className={tw("text-gray-500!")} />
              <p className={tw("opacity-90 text-center")}>Authenticating...</p>
            </>
          ) : (
            <>
              <p className={tw("opacity-90 text-center")}>
                Please
                <span className={tw("font-medium")}> Login</span> to access
                content.
              </p>
              <Button onClick={() => navigate("/login")}>Login</Button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default DashboardLayout;
