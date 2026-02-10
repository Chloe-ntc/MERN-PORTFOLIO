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

  // Fetch portfolio data
  const fetchPortfolioData = useCallback(async () => {
    dispatch(showLoading());
    try {
      const response = await api.get("/api/portfolio/get-portfolio-data");
      if (response?.data) {
        dispatch(setPortfolioData(response.data));
      }
      dispatch(ReloadData(false));
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      dispatch(hideLoading());
    }
  }, [dispatch]);

  // Run once on mount
  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Re-fetch if reloadData is true
  useEffect(() => {
    if (reloadData) {
      fetchPortfolioData();
    }
  }, [reloadData, fetchPortfolioData]);

  return (
    <BrowserRouter>
      {/* Loader appears while fetching */}
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
