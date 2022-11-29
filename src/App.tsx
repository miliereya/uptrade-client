import { Header } from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import { ProjectPage } from "./pages/ProjectPage";
import { ChooseProjectPage } from "./pages/ChooseProjectPage";
import { AuthPopup } from "./components/AuthPopup";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { PageSpinner } from "./components/UI/loaders/spinner";
import { useEffect } from 'react'
import { userService } from "./services/userService";
import { useDispatch } from "react-redux";

function App() {
  const { authPopupToogle, isLoading } = useTypedSelector(state => state.global)
  const dispatch = useDispatch()

  useEffect(() => {
    userService.refresh(dispatch)
  }, [])

  return (
    <>
      {authPopupToogle && <AuthPopup />}
      {isLoading && <PageSpinner />}
      <Header />
      <Routes>
        <Route path="/" element={<ChooseProjectPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default App;
