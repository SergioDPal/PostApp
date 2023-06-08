import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {FadingMessageContext} from "../../context/FadingBannerProvider";
import {LoginDataContext} from "../../context/LoginDataProvider";
import {editUser} from "../../services";
import {DeleteUser} from "../../components/DeleteUser/DeleteUser";
import {BigButton} from "../../components/BigButton/BigButton";
import "./EditUser.css";

const updateLoggedUser = (
  setLoggedUser,
  loggedUser,
  email,
  userName,
  avatar,
  deleteAvatar
) => {
  let changedValues = {};
  if (email !== "") changedValues = {...changedValues, email};
  if (userName !== "") changedValues = {...changedValues, name: userName};
  if (avatar) changedValues = {...changedValues, avatar: 1};
  if (deleteAvatar) changedValues = {...changedValues, avatar: 0};

  setLoggedUser({...loggedUser, ...changedValues});
};

const EditUser = () => {
  const {setFadingMessage} = useContext(FadingMessageContext);
  const {token, setLoggedUser, loggedUser} = useContext(LoginDataContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteAvatar, setDeleteAvatar] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (!userName && !email && !newPassword && !deleteAvatar && !avatar) ||
      !oldPassword
    ) {
      setFadingMessage(
        "You need to fill at least one field and your current password.",
        true
      );
    } else {
      try {
        const formData = new FormData();

        userName && formData.append("name", userName);
        email && formData.append("email", email);
        deleteAvatar && formData.append("avatar", "delete");
        avatar && !deleteAvatar && formData.append("avatar", avatar);
        newPassword && formData.append("password", newPassword);
        formData.append("oldPwd", oldPassword);

        const editRes = await editUser(formData, token);

        if (editRes.status === "ok") {
          updateLoggedUser(
            setLoggedUser,
            loggedUser,
            email,
            userName,
            avatar,
            deleteAvatar,
            setFadingMessage
          );
          setFadingMessage("User updated successfully!");
        }
      } catch (err) {
        setFadingMessage("Something happened, please try again.", true);
      }
      setDeleteAvatar(false);
      setUserName("");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
    }
    if (loggedUser.avatar === 1)
      document.getElementById("deleteavatar").checked = false;
    document.getElementById("avatar").value = null;
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
            id="imagepreview"
            src={
              loggedUser.avatar === 1 && !deleteAvatar
                ? `${process.env.REACT_APP_HOST}/avatar/${loggedUser.id}`
                : "/icons/default_profile.svg"
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
                          document.getElementById("deleteavatar");
                        checkbox.checked = !checkbox.checked;
                      }}
                    ></span>
                  </section>
                  <label
                    htmlFor="deleteavatar"
                    className="deleteavatar"
                  >
                    Remove avatar
                  </label>
                </>
              )}
              <input
                className="inputfile"
                disabled={deleteAvatar ? "disabled" : false}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  if (e.target.files) {
                    const image = document.getElementById("imagepreview");
                    image.src = URL.createObjectURL(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="avatar"
                className={deleteAvatar ? "disabledavatarfile" : "avatarfile"}
              >
                <span className="textbutton"> Avatar</span>
              </label>
            </>
          </section>

          <input
            className="name"
            placeholder="Name"
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
            placeholder="New password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            name="newPassword"
          ></input>
          <label htmlFor="oldpassword">Password:</label>
          <input
            id="oldpassword"
            title="Password"
            placeholder="Password"
            className="oldpassword"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            name="oldPassword"
            required
          ></input>
          <BigButton>Save changes</BigButton>
        </form>

        <DeleteUser />
      </section>
    </>
  );
};

export {EditUser};
