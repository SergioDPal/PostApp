import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FadingMessageContext } from '../../context/FadingBannerProvider';
import { LoginDataContext } from '../../context/LoginDataProvider';
import { editUser } from '../../services';
import { DeleteUser } from '../../components/DeleteUser/DeleteUser';
import { BigButton } from '../../components/BigButton/BigButton';
import './EditUser.css';

const EditUser = () => {
  const { setFadingMessage } = useContext(FadingMessageContext);
  const { token, setLoggedUser, loggedUser } = useContext(LoginDataContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deleteAvatar, setDeleteAvatar] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (!userName && !email && !newPassword && !deleteAvatar && !avatar) ||
      !oldPassword
    ) {
      setFadingMessage('¡Mínimo un campo y contraseña actual!', true);
    } else {
      try {
        const formData = new FormData();
        if (userName) formData.append('name', userName);
        if (email) formData.append('email', email);
        if (newPassword) formData.append('password', newPassword);
        if (deleteAvatar) formData.append('avatar', 'delete');
        if (avatar && !deleteAvatar) formData.append('avatar', avatar);
        formData.append('oldPwd', oldPassword);

        const editRes = await editUser(formData, token);

        if (editRes.status === 'ok') {
          let changedValues = {};
          if (email !== '') changedValues = { ...changedValues, email };
          if (userName !== '')
            changedValues = { ...changedValues, name: userName };

          if (avatar) changedValues = { ...changedValues, avatar: 1 };

          if (deleteAvatar) changedValues = { ...changedValues, avatar: 0 };

          setLoggedUser({ ...loggedUser, ...changedValues });
          setFadingMessage('¡Usuario editado!');
        }
      } catch (err) {
        setFadingMessage('¡Error al editar usuario!', true);
      }
      setDeleteAvatar(false);
      setUserName('');
      setEmail('');
      setOldPassword('');
      setNewPassword('');
    }
    document.getElementById('deleteavatar').checked = false;
    document.getElementById('avatar').value = null;
  };

  return !token ? (
    <Navigate to="/" />
  ) : (
    <>
      <section className="edituserformwrapper">
        <form
          className="edituserform"
          onSubmit={handleSubmit}
        >
          <img
            id="imagen"
            src={
              loggedUser.avatar === 1 && !deleteAvatar
                ? `${process.env.REACT_APP_HOST}/${loggedUser.id}`
                : '/icons/default_profile.svg'
            }
            alt="preview"
          />
          <section className="avatarform">
            <>
              {loggedUser.avatar === 1 && (
                <>
                  <section className="checkboxcontainer">
                    <input
                      id="deleteavatar"
                      type="checkbox"
                      className="deleteavatar"
                      onClick={(e) => {
                        setDeleteAvatar(!deleteAvatar);
                      }}
                    ></input>
                    <span
                      className="checkmark"
                      onClick={(e) => {
                        setDeleteAvatar(!deleteAvatar);
                        const checkbox =
                          document.getElementById('deleteavatar');
                        checkbox.checked = !checkbox.checked;
                      }}
                    ></span>
                  </section>
                  <label
                    htmlFor="deleteavatar"
                    className="deleteavatar"
                  >
                    Eliminar avatar
                  </label>
                </>
              )}
              <input
                className="inputfile"
                disabled={deleteAvatar ? 'disabled' : ''}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  if (e.target.files) {
                    const imagen = document.getElementById('imagen');
                    imagen.src = URL.createObjectURL(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="avatar"
                className={deleteAvatar ? 'disabledavatarfile' : 'avatarfile'}
              >
                <span className="textbutton"> Avatar</span>
              </label>
            </>
          </section>

          <input
            className="name"
            placeholder="Nombre"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            name="userName"
            autoFocus
          ></input>

          <input
            className="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          ></input>

          <input
            className="password"
            placeholder="Nueva Contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            name="newPassword"
          ></input>
          <label htmlFor="oldpassword">Contraseña:</label>
          <input
            className="oldpassword"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            name="oldPassword"
            required
          ></input>
          <BigButton>Guardar cambios</BigButton>
        </form>

        <DeleteUser />
      </section>
    </>
  );
};

export { EditUser };
