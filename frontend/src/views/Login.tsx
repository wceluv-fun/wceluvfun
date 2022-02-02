import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth, loginForm } from "../hooks/Auth";
import illus from "../images/login.svg";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data: loginForm) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

    auth?.login(
      data,
      () => {
        setIsLoading(false);
        // console.log("login succex");
        history.push("/dashboard");
      },
      (e: AxiosError) => {
        setIsLoading(false);
        // console.log("Error", e);
        if (e.response?.status === 401) {
          setMessage("Email ID / Password are wrong.");
        } else if (e.response?.status === 404) {
          setMessage("Email not found, please register.");
        } else {
          setMessage("An internal error happened, try again later.");
        }
      }
    );
  };

  return (
    <div className="authform login">
      <div className="illus">
        <img width = {600}src={illus} alt="Chora Chori Gup Chup Gup Chup" />
      </div>
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            placeholder="WCE Email"
            ref={register({
              required: true,
              pattern: /[a-zA-Z.]+@(walchandsangli)\.ac\.in/g,
            })}
          />
          {errors.email?.type === "required" && <p>This field is required</p>}
          {errors.email?.type === "pattern" && <p>IITKGP email-id only</p>}

          <input name="password" placeholder="Password" type="password" ref={register({ required: true })} />
          {errors.password && <p>This field is required</p>}
          <div className="error">{message}</div>

          <input type="submit" value="Let me in" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Login;
