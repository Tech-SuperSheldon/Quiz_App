// Utility functions for managing authentication data storage

export interface AuthData {
  token: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    grade: string;
    course: string[];
    mobile_number?: string;
    language: string;
    picture?: string;
  };
}

export interface RegistrationResponse {
  message: string;
  token: string;
  user: {
    course: string[];
    email: string;
    grade: string;
    id: string;
    language: string;
    mobile_number: string | null;
    name: string;
  };
}

export interface StoredAuthData {
  token: string;
  userId: string;
  user: AuthData["user"];
  timestamp: number;
}

// Store auth data in localStorage
export const storeAuthData = (authData: AuthData): void => {
  try {
    const storedData: StoredAuthData = {
      token: authData.token,
      userId: authData.user.id,
      user: authData.user,
      timestamp: Date.now(),
    };

    localStorage.setItem("quiz_auth_data", JSON.stringify(storedData));
    console.log("Auth data stored successfully");
  } catch (error) {
    console.error("Error storing auth data:", error);
  }
};

// Retrieve auth data from localStorage
export const getAuthData = (): StoredAuthData | null => {
  try {
    const stored = localStorage.getItem("authData");
    if (!stored) return null;

    const authData: StoredAuthData = JSON.parse(stored);

    // Check if data is expired (7 days)
    const isExpired = Date.now() - authData.timestamp > 7 * 24 * 60 * 60 * 1000;
    if (isExpired) {
      clearAuthData();
      return null;
    }

    return authData;
  } catch (error) {
    console.error("Error retrieving auth data:", error);
    return null;
  }
};

// Clear auth data from localStorage
export const clearAuthData = (): void => {
  try {
    localStorage.removeItem("quiz_auth_data");
    console.log("Auth data cleared");
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const authData = getAuthData();
  return authData !== null && !!authData.token && !!authData.userId;
};

// Get auth headers for API requests
export const getAuthHeaders = (): Record<string, string> => {
  const authData = getAuthData();
  if (!authData) {
    throw new Error("No authentication data found");
  }

  return {
    Authorization: `Bearer ${authData.token}`,
    "Content-Type": "application/json",
  };
};

// Get user info
export const getUserInfo = () => {
  const authData = getAuthData();
  return authData ? authData.user : null;
};

// Store registration data
export const storeRegistrationData = (
  registrationData: RegistrationResponse
): void => {
  try {
    const authData: AuthData = {
      token: registrationData.token,
      userId: registrationData.user.id,
      user: {
        id: registrationData.user.id,
        name: registrationData.user.name,
        email: registrationData.user.email,
        grade: registrationData.user.grade,
        course: registrationData.user.course,
        mobile_number: registrationData.user.mobile_number || undefined,
        language: registrationData.user.language,
      },
    };

    storeAuthData(authData);
    console.log("Registration data stored successfully");
  } catch (error) {
    console.error("Error storing registration data:", error);
  }
};
