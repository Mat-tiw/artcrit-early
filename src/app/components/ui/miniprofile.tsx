import { Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { login, userPic, defaultBackend } from "../../../api/api.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#313338",
  border: "4px solid #B1F827",
  p: 4,
  color: "white",
  borderRadius: "0.75rem",
};

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const MiniProfile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openRegi, setOpenRegi] = useState(false);
  const handleOpenRegi = () => setOpenRegi(true);
  const handleCloseRegi = () => {
    setOpenRegi(false);
    setUser("");
    setEmail("");
    setPwd("");
    setMatchPwd("");
  };

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [visibilityIcon, setVisibilityIcon] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>("password");

  const [visbilityIconConfirm, setVisbilityIconConfirm] =
    useState<boolean>(false);
  const [confirmInputState, setConfirmInputState] =
    useState<string>("password");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorCondition, setErrorCondition] = useState<boolean>(false);
  function toggleVisivilitiy() {
    if (visibilityIcon) {
      setVisibilityIcon(false);
      setInputState("password");
      return;
    } else {
      setVisibilityIcon(true);
      setInputState("text");
    }
  }
  function toggleConfirmVisivilitiy() {
    if (visbilityIconConfirm) {
      setVisbilityIconConfirm(false);
      setConfirmInputState("password");
      return;
    } else {
      setVisbilityIconConfirm(true);
      setConfirmInputState("text");
    }
  }

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${defaultBackend}user/login`, {
        email: email,
        pwd: pwd,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userPic", res.data.userPic);
      localStorage.setItem("userId", res.data.userId);
      setOpen(false);
      location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleSubmitCreate = async () => {
    try {
      await axios.post(`${defaultBackend}user/create`, {
        user: user,
        pwd: pwd,
        email: email,
      });
      const res = await axios.post(`${defaultBackend}user/login`, {
        email: email,
        pwd: pwd,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userPic", res.data.userPic);
      localStorage.setItem("userId", res.data.userId);
      setOpenRegi(false);
      location.reload();
    } catch (error) {
      setErrorCondition(true);
      setErrorMessage("Email is already in used");
    }
  };
  function handleEmailOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrorCondition(false);

  }
  return (
    <>
      <div className="bg-secondary m-5 flex flex-col items-center justify-center rounded-xl sticky">
        {login ? (
          <Avatar
            alt="Remy Sharp"
            src={userPic ?? ""}
            className="m-5"
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          ""
        )}
        {login ? (
          <h1 id="username" className="font-montserrat font-bold pb-5 text-2xl">
            {localStorage.getItem("userName")}
          </h1>
        ) : (
          <div className="mt-5 mb-4 flex flex-col">
            <button
              id="openInputBtn"
              className="text-center item-center text-primary font-montserrat font-bold p-2 mb-2 text-2xl cursor-pointer border-2 border-primary rounded-xl"
              onClick={handleOpen}
            >
              Login
            </button>
            <i className="border-b-gray-400 w-full border-1"></i>
            <button
              id="openRegiBtn"
              className="text-center text-primary font-montserrat font-bold p-2 mb-2 text-2xl cursor-pointer border-2 border-primary rounded-xl"
              onClick={handleOpenRegi}
            >
              Register
            </button>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="font-montserrart text-2xl font-bold">Login</h1>
          <input
            type="email"
            id="regiEmailInput"
            value={email}
            autoComplete="off"
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            className="
            text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
            placeholder="Email"
            onChange={(e) => handleEmailOnChange(e)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            Your email address should be 4 to 24 characters long
            <br />
            start with a letter, and can include letters, numbers, underscores,
            and hyphens
          </p>
          <div className="flex flex-row">
            <input
              id="pwdLoginInput"
              type={inputState}
              className=" text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
              placeholder="password"
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              value={pwd}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <button
              className="mt-3"
              onClick={() => toggleVisivilitiy()}
              type="button"
            >
              {visibilityIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <p
            id="pwdnote"
            className={
              pwd != "" && !validPwd
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <button
            type="submit"
            disabled={!validPwd || !validEmail}
            id="submitLoginForm"
            onClick={handleSubmit}
            className={
              !validPwd || !validEmail
                ? "translate-x-28 mt-5 border-gray-500 text-gray-500 border-2 p-2 rounded-xl text-xl font-montserrart"
                : "translate-x-28 mt-5 border-white border-2 p-2 rounded-xl text-xl font-montserrart hover:text-secondary hover:bg-primary hover:border-transparent transition-colors ease-out duration-1000"
            }
          >
            Submit
          </button>
        </Box>
      </Modal>
      <Modal
        open={openRegi}
        onClose={handleCloseRegi}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="font-montserrart text-2xl font-bold">Register</h1>
          <input
            id="usernameRegiInput"
            value={user}
            autoComplete="off"
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            type="text"
            className="
            text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
            placeholder="username"
            onChange={(e) => setUser(e.target.value)}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <input
            type="email"
            id="regiEmailInput"
            value={email}
            autoComplete="off"
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            className="
            text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
            placeholder="Email"
            onChange={(e) => handleEmailOnChange(e)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            Your email address should be 4 to 24 characters long
            <br />
            start with a letter, and can include letters, numbers, underscores,
            and hyphens
          </p>
          <div className="flex flex-row">
            <input
              id="pwdRegiInput"
              type={inputState}
              className=" text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
              placeholder="password"
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              value={pwd}
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <button
              className="mt-3"
              onClick={() => toggleVisivilitiy()}
              type="button"
            >
              {visibilityIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <p
            id="pwdnote"
            className={
              pwd != "" && !validPwd
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <div className="flex flex-row">
            <input
              id="confirmpwdRegiInput"
              type={confirmInputState}
              className=" text-xl font-montserrart
            bg-transparent m-5 border-white border-2 border-t-transparent border-r-transparent border-l-transparent focus:border-t-transparent"
              placeholder="re-enter password"
              value={matchPwd}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              autoComplete="off"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <button
              className="mt-3"
              onClick={() => toggleConfirmVisivilitiy()}
              type="button"
            >
              {visbilityIconConfirm ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </button>
          </div>
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch
                ? "text-white border-2 border-red-700 rounded-xl p-2"
                : "hidden"
            }
          >
            Must match the first password input field.
          </p>
          {errorCondition ? (
            <p className="text-white border-2 border-red-700 rounded-xl p-2">
              {errorMessage}
            </p>
          ) : (
            errorMessage
          )}
          <button
            type="submit"
            id="regiSubmit"
            disabled={!validName || !validPwd || !validMatch || !validEmail}
            onClick={handleSubmitCreate}
            className={
              !validName || !validPwd || !validMatch || !validEmail
                ? "translate-x-28 mt-5 border-gray-500 text-gray-500 border-2 p-2 rounded-xl text-xl font-montserrart"
                : "translate-x-28 mt-5 border-white border-2 p-2 rounded-xl text-xl font-montserrart hover:text-secondary hover:bg-primary hover:border-transparent transition-colors ease-out duration-1000"
            }
          >
            Submit
          </button>
        </Box>
      </Modal>
    </>
  );
};
MiniProfile.displayName = "MiniProfile";
export { MiniProfile };
