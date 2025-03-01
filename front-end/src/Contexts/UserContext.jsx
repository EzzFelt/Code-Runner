import { createContext, useEffect, useState } from "react";

// Create a context for the user
export const UserContext = createContext({});

// UserProvider component to provide user context to its children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect to initialize user from localStorage and refetch user data
  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            ...parsedUser,
            lessonsCompleted: parsedUser.lessonsCompleted || 0,
          });
        } catch (error) {
          console.error("Erro ao analisar usuário no localStorage:", error);
        }
      }
      await refetchUser();
    };

    initializeUser();
  }, []);

  // Function to handle user login
  const handleLogin = (userData) => {
    if (userData && userData.name && userData.token) {
      const userToStore = {
        ...userData,
        lessonsCompleted: userData.lessonsCompleted || 0,
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('token', userData.token);
      setUser(userToStore);
      console.log('Usuário logado com sucesso:', userToStore);
    } else {
      console.error('Dados do usuário são inválidos ou incompletos:', userData);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Function to refetch user data from the server
  const refetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return handleLogout();
    }

    try {
      const response = await fetch("/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const userData = {
          name: data.name,
          token: data.token,
          lessonsCompleted: data.lessonsCompleted || 0,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Provide user context to children components
  return (
    <UserContext.Provider value={{
      user,
      setUser,
      handleLogin,
      handleLogout,
      refetchUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;