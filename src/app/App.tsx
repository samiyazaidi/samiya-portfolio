import { Routes, Route } from "react-router-dom";
import { ProjectDetailPage } from "../components/projects/ProjectDetailPage";
import HomePage from "./HomePage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects/:slug"
        element={<ProjectDetailPage />}
      />
    </Routes>
  );
}