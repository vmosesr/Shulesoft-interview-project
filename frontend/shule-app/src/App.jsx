import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Create from "./pages/posts/create";
import Show from "./pages/posts/Show";
import Update from "./pages/posts/Update";
import "./App.css";

export default function App() {

  return <BrowserRouter>

    <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<Home/>} />

          <Route path="/create" element={<Create />} />
          <Route path="/posts/update/:id" element={<Update />} /> 
          <Route path="/posts/:id" element={<Show />} />
        </Route>

    </Routes>
  
  </BrowserRouter>

}
