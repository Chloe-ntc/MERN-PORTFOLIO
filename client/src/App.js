import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading, setPortfolioData } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import { ReloadData } from "./redux/rootSlice";
import Login from "./pages/Admin/Login";

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      dispatch(showLoading());
      const response = await api.get("/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data));
      dispatch(reloadData(false));
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

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
