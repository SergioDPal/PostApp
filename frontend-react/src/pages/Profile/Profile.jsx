import { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getUserProfile } from '../../services';
import { Loading } from '../../components/Loading/Loading';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { useRequestHandler } from '../../hooks/useRequestHandler';
import './Profile.css';
import { BigButton } from '../../components/BigButton/BigButton';

const Profile = () => {
  const { token } = useContext(LoginDataContext);
  const { id } = useParams();
  const [profileData, setProfileData] = useState();

  useRequestHandler(() => getUserProfile(token, id, setProfileData));

  return profileData === undefined ? (
    <Loading />
  ) : (
    <>
      <section className="userprofile">
        <img
          src={
            profileData.avatar === 1
              ? `${process.env.REACT_APP_HOST}/${id}`
              : '/icons/default_profile.svg'
          }
          alt="Avatar"
          className="avatar"
        />
        <h2>{`${profileData.name}`}</h2>
        <ul className={profileData.email ? 'userdata' : 'userdatashort'}>
          {profileData.email ? <li className="emailkey">Email </li> : null}
          <li className="datekey">User since</li>
          <li className="postskey"> Post count</li>

          {profileData.email && (
            <li className="emailvalue">{profileData.email}</li>
          )}
          <li className="datevalue">
            {`${new Date(`${profileData.createdAt}`).toLocaleDateString()}`}
          </li>
          <li className="postsvalue"> {profileData.postcount}</li>
        </ul>
      </section>
      {profileData.email && (
        <NavLink
          className="edituserbutton"
          to="/user/edit"
        >
          <BigButton>Edit user</BigButton>
        </NavLink>
      )}
    </>
  );
};

export { Profile };
