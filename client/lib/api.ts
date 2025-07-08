const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Types for API responses
export interface User {
  id: string;
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  role: string;
  is_demo: boolean;
  is_verified: boolean;
  phone_verified: boolean;
  profile_image?: string;
  created_at: string;
  last_login?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: string;
  category: string;
  lessons_count: number;
  rating: string;
  students_count: number;
  is_free: boolean;
  image_url?: string;
  progress_percentage?: number;
  is_enrolled?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions_count: number;
  time_limit?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  severity: string;
  source: string;
  url: string;
  image_url?: string;
  published_at: string;
  views: number;
}

// API Service Class
class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  // Authentication endpoints
  async register(userData: {
    email: string;
    phone?: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
  }): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    this.setToken(response.access_token);
    return response;
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    this.setToken(response.access_token);
    return response;
  }

  async sendOTP(phone: string): Promise<{ message: string }> {
    return await this.request("/api/auth/phone/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  }

  async verifyOTP(phone: string, code: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>(
      "/api/auth/phone/verify-otp",
      {
        method: "POST",
        body: JSON.stringify({ phone, code }),
      },
    );

    this.setToken(response.access_token);
    return response;
  }

  async demoLogin(): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>("/api/auth/demo", {
      method: "POST",
    });

    this.setToken(response.access_token);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return await this.request<User>("/api/auth/me");
  }

  // Course endpoints
  async getCourses(): Promise<Course[]> {
    return await this.request<Course[]>("/api/courses");
  }

  async enrollCourse(courseId: string): Promise<{ message: string }> {
    return await this.request(`/api/courses/${courseId}/enroll`, {
      method: "POST",
    });
  }

  // Quiz endpoints
  async getQuizzes(): Promise<Quiz[]> {
    return await this.request<Quiz[]>("/api/quizzes");
  }

  async submitQuiz(
    quizId: string,
    results: {
      score: number;
      total_questions: number;
      time_taken?: number;
    },
  ): Promise<any> {
    return await this.request(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      body: JSON.stringify({ quiz_id: quizId, ...results }),
    });
  }

  // News endpoints
  async getNews(
    params: {
      limit?: number;
      offset?: number;
      category?: string;
    } = {},
  ): Promise<NewsArticle[]> {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.offset) queryParams.append("offset", params.offset.toString());
    if (params.category) queryParams.append("category", params.category);

    return await this.request<NewsArticle[]>(`/api/news?${queryParams}`);
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<any> {
    return await this.request("/api/dashboard/stats");
  }

  // Health check
  async healthCheck(): Promise<{ message: string }> {
    return await this.request("/");
  }
}

// Create and export API instance
export const api = new ApiService(API_BASE_URL);

// Helper functions for common operations
export const authHelpers = {
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },

  logout: (): void => {
    api.clearToken();
    window.location.href = "/";
  },

  getStoredUser: (): User | null => {
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  storeUser: (user: User): void => {
    localStorage.setItem("user_data", JSON.stringify(user));
  },

  clearUser: (): void => {
    localStorage.removeItem("user_data");
  },
};

export default api;
