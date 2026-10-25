import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Notfound from "./Pages/NotFound/Notfound";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoutesAuth from "./ProtectedRoutes/ProtectedRoutesAuth";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./Pages/PostDetails/PostDetails";
import { Toaster } from "react-hot-toast";
import { useNetworkState } from "react-use";
import Offline from "./Components/OffLine/Offline";
import PostUpdate from "./Pages/PostUpdate/PostUpdate";

function App() {
  const query = new QueryClient();
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/postdetails/:id",
          element: (
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/postupdate/:id",
          element: (
            <ProtectedRoutes>
              <PostUpdate />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedRoutesAuth>
              <Register />
            </ProtectedRoutesAuth>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedRoutesAuth>
              <Login />
            </ProtectedRoutesAuth>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  const { online } = useNetworkState();
  return (
    <>
      {!online && (
        <>
          <Offline />
        </>
      )}
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <Toaster />
          <RouterProvider router={routers}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
