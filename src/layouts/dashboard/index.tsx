import { tw } from "twind";
import { Stack } from "@mui/material";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { isConnected } = { isConnected: true };
  const [sidebar, setSidebar] = useState(true);

  const isEligible = isConnected;

  return (
    <section className={tw("w-full flex flex-col relative h-screen")}>
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
          {isEligible ? (
            <Outlet />
          ) : (
            <div
              className={tw(
                "w-full flex-col gap-3 h-full justify-center items-center flex"
              )}
            >
              <p className={tw("opacity-90 text-center")}>
                {!isConnected ? (
                  <>
                    Please connect your
                    <span className={tw("font-medium")}> WEB-3</span> account to
                    access content.
                  </>
                ) : (
                  <>
                    Your address is not a{" "}
                    <span className={tw("font-medium")}>whitelisted</span>{" "}
                    address.
                    <br />
                    Please use a{" "}
                    <span className={tw("font-medium")}>different</span> account
                    to access the content.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </Stack>
    </section>
  );
};

export default DashboardLayout;
