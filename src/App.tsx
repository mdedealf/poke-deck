import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/details/:name" element={<DetailsPage />} />
    </Routes>
  );
};

export default App;
