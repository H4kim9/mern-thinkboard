import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Toaster position="top-center"/>

      <div className = "relative w-full h-full">
        <div className ="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
          [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#3040bb_100%)]" />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
