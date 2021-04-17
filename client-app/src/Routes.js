import React, { lazy, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/Main"

//lazy imports
const Home = lazy(() => import("./views/home"))
const ChatBox = lazy(() => import("./views/chat-box"))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat-box" element={<ChatBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
