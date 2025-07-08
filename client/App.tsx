import "./global.css";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginGate } from "@/components/auth/LoginGate";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import News from "./pages/News";
import Quiz from "./pages/Quiz";
import Learning from "./pages/Learning";
import CourseDetail from "./pages/CourseDetail";
import CourseEnrolled from "./pages/CourseEnrolled";
import Threats from "./pages/Threats";
import ThreatDetail from "./pages/ThreatDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes (accessible when not authenticated) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes (accessible when authenticated) */}
      {user ? (
        <>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:courseId" element={<CourseDetail />} />
          <Route
            path="/learning/:courseId/enrolled"
            element={<CourseEnrolled />}
          />
          <Route path="/threats" element={<Threats />} />
          <Route path="/threats/:threatId" element={<ThreatDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        /* Redirect to login for protected routes when not authenticated */
        <Route path="*" element={<LoginGate />} />
      )}
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
