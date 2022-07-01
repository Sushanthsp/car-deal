import { signInWithGoogle } from "../../config/firebaseinit";
import './GoogleSign.css'

function SignIn() {
  return (
    <div className="sign-in">
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default SignIn;