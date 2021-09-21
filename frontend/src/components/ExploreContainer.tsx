import useAuth from 'hooks/useAuth';
import { login, logout } from 'lib/auth';
import { useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const { isLoggedIn, userId, userProfile, setLogin, setLogout, shouldCreateProfile } = useAuth();
  const [err, setError] = useState<Error | undefined>(undefined)

  async function logIn() {
    const { user, err, unauthorized } = await login("admin@gmail.com", "admin")
    if (err || unauthorized) {
      setError(err)
      return
    }

    if (user) {
      console.log({ user })
      setLogin(user.uuid)
    }
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
        <div className="text-3xl font-normal text-gray-800">
          {shouldCreateProfile && "create profile la"}
        </div>
        <div className="flex flex-col items-center">
          <p >
            User ID: {userId ?? "none"}
          </p>

          {userProfile
            ?
            <>
              <p> Name: {`${userProfile.first_name} ${userProfile.last_name}`}</p>
              <p>Email: {userProfile.user?.email}</p>
              <img src={userProfile.profile_pic} alt="profile pic"></img>
            </>
            : <p>No profile available</p>
          }

        </div>
      </div>
    </div>
  );
};

export default ExploreContainer;
