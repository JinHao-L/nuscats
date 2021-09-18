import useAuth from 'hooks/useAuth';
import { login, logout } from 'lib/auth';
import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const { isLoggedIn, setLogin, setLogout } = useAuth();
  const [err, setError] = useState<Error | undefined>(undefined)

  async function logIn() {
    let { err, unauthorized } = await login("admin@gmail.com", "admin")
    if (err || unauthorized) {
      setError(err)
      return
    }

    console.log("logged in!")
    setLogin()
  }

  async function logOut() {
    await logout()
    setLogout()
  }

  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <button
        className="px-4 py-2 m-5 text-white rounded-md shadow-lg bg-primary-400"
        onClick={() => logIn()}
      >
        login!
      </button>
      <button
        className="px-4 py-2 m-5 text-white bg-red-500 rounded-md shadow-lg"
        onClick={() => logOut()}
      >
        logout!
      </button>
      <div>
        <div className="text-lg font-normal text-gray-800">
          {isLoggedIn ? "logged in" : "not logged in!"}
          {err?.message}<br />
        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
