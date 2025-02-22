import React, { useContext, useEffect, useState } from "react";
import "../Styles/Home.css";
import { UserContext } from "../Contexts/UserContext.jsx";

const Home = () => {
  // Destructure user, refetchUser, and setUser from UserContext
  const { user, refetchUser} = useContext(UserContext);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to update user data
    const updateUserData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      await refetchUser(); // Fetch user data
      setIsLoading(false); // Set loading to false after data is fetched
    };

    updateUserData(); // Call the function to update user data
  }, [refetchUser]); // Dependency array to call useEffect when refetchUser changes

  // Show loading message while data is being fetched
  if (isLoading) {
    return <div className="loading">Carregando dados do usuário...</div>;
  }

  // Show error message if user data is not available
  if (!user) {
    return <div className="error">Erro ao carregar os dados do usuário.</div>;
  }

  return (
    <div className="home-container">
      <div className="profile-container">
        <img
          src={user.profilePicture || "public/imgs/pfp.jpg"} // User's profile picture or default image
          alt="Foto do Usuário"
          className="profile-picture"
        />
        <h1 className="welcome-title">Bem-vindo, {user.name}!</h1>
        <p className="lessons-completed">
          Você realizou {user.lessonsCompleted || 0} lições até agora!
        </p>
      </div>

      <div className="weekly-challenges">
        <h2>Desafios Semanais</h2>
        <div className="challenges">
          <div className="challenge-card">
            <i className="fab fa-js-square" style={{ color: "#f7df1e" }}></i>
            <span>JS</span>
          </div>
          <div className="challenge-card">
            <i className="fab fa-cuttlefish" style={{ color: "#0078d7" }}></i>
            <span>C#</span>
          </div>
          <div className="challenge-card">
            <i className="fab fa-python" style={{ color: "#3776ab" }}></i>
            <span>Python</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
