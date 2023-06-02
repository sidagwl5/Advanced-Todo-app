import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./screens/login/Login";
import { Alert } from "./ui/atoms/Alert";
import { tw } from "twind";
import { SnackbarProvider } from "notistack";
import DashboardLayout from "./layouts/dashboard";
import Dashboard from "./screens/dashboard/Dashboard";
import { GlobalContext } from "./GlobalContext";

function App() {
  return (
    <GlobalContext>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        classes={{
          root: tw("min-w-max!"),
        }}
        Components={{
          default: Alert,
          success: Alert,
          error: Alert,
          info: Alert,
          warning: Alert,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard/" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </GlobalContext>
  );
}

export default App;
