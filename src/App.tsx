import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// conponents
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
// pages
import Home from "./pages/Home";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Weather from "./pages/Weather.tsx";
import CropAdviser from "./pages/CropAdviser.tsx";
import Disease from "./pages/Disease.tsx";
import Apmc from "./pages/Apmc.tsx";
import ErrorPage from "./pages/ErrorHandler/ErrorPage.tsx";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    {/* <Footer /> */}
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "weather.report",
        element: <Weather />,
      },
      {
        path: "/crop.adviser.ai",
        element: <CropAdviser />,
      },
      {
        path: "/crop.disease.ai",
        element: <Disease />,
      },
      {
        path: "/apmc",
        element: <Apmc />,
      },
      {
        path: "/auth.register",
        element: <Register />,
      },
      {
        path: "/auth.login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => (
  <div className="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
