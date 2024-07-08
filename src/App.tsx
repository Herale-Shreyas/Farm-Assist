import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// conponents
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
// pages
import Home from "./pages/Home";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Weather from "./pages/Weather.tsx";
import Cropadviser from "./pages/Cropadviser.tsx";
import Disease from "./pages/Disease.tsx";
import Apmc from "./pages/Apmc.tsx";
import AuthTemplate from "./pages/AuthTemplate.tsx";
import ErrorElement from "./pages/ErrorElement.tsx";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const AuthLayout = () => (
  <AuthTemplate>
    <Outlet />
  </AuthTemplate>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "weather",
        element: <Weather />,
      },
      {
        path: "/cropadviser",
        element: <Cropadviser />,
      },
      {
        path: "/disease",
        element: <Disease />,
      },
      {
        path: "/apmc",
        element: <Apmc />,
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/register",
            element: <Register />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
        ],
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
