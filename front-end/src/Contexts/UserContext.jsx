import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

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