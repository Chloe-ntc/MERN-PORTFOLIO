import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { useEffect, useCallback } from "react";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading, setPortfolioData, ReloadData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await api.get("/api/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData, getPortfolioData]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
