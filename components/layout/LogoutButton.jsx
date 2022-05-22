import theme from "../../styles/theme.module.css";
import LogoutIcon from "./LogoutIcon";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { useState } from "react";

export default function LogoutButton() {
  const authentication = useAuthentication();
  const [disabled, setDisabled] = useState(false);

  const logout = () => {
    setDisabled(true);
    authentication.logout()
      .catch(e => alert(e.message))
      .finally(() => setDisabled(false));
  }

  return <button className={`${theme.buttonPrimaryIcon}`} disabled={disabled} onClick={logout}>
    <LogoutIcon/>
  </button>
}
