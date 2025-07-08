import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  enrolledCourses: string[];
  firebaseUid?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  enrollInCourse: (courseId: string) => void;
  isEnrolledInCourse: (courseId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Create user object from Firebase user
        const userData: User = {
          id: firebaseUser.uid,
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "",
          role: "user",
          enrolledCourses: JSON.parse(
            localStorage.getItem(`enrolledCourses_${firebaseUser.uid}`) || "[]",
          ),
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        // Check for existing demo session
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Only keep demo users if no Firebase user
          if (userData.id === "demo" || userData.id === "admin") {
            if (!userData.enrolledCourses) {
              userData.enrolledCourses = [];
            }
            setUser(userData);
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Demo user login
      if (username === "user" && password === "user") {
        const demoUser = {
          id: "demo",
          email: "user@cybersafe.com",
          name: "Demo User",
          role: "user" as const,
          enrolledCourses: [],
        };
        setUser(demoUser);
        localStorage.setItem("user", JSON.stringify(demoUser));
        return true;
      }

      // Admin login
      if (username === "admin" && password === "admin") {
        const adminUser = {
          id: "admin",
          email: "admin@cybersafe.com",
          name: "Administrator",
          role: "admin" as const,
          enrolledCourses: [],
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign in");
    }
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    name: string,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
    } catch (error: any) {
      throw new Error(error.message || "Failed to create account");
    }
  };

  const signupWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign up with Google");
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign in with Google");
    }
  };

  const logout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      setUser(null);
      localStorage.removeItem("user");
    } catch (error: any) {
      console.error("Logout error:", error);
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Store enrolled courses separately for Firebase users
      if (user.firebaseUid) {
        localStorage.setItem(
          `enrolledCourses_${user.firebaseUid}`,
          JSON.stringify(updatedUser.enrolledCourses),
        );
      }
    }
  };

  const isEnrolledInCourse = (courseId: string): boolean => {
    return user?.enrolledCourses.includes(courseId) || false;
  };

  const value = {
    user,
    login,
    loginWithEmail,
    signupWithEmail,
    signupWithGoogle,
    loginWithGoogle,
    logout,
    isLoading,
    enrollInCourse,
    isEnrolledInCourse,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
