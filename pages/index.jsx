import Welcome from "../components/welcome/welcome";
import { useAuthentication } from "../lib/context/AuthenticationContext";
import { useRouter } from "next/router";

export default function Root() {
    const authentication = useAuthentication();
    const router = useRouter();

    if (process.browser && authentication.getUser() != null) {
        router.push('/dashboard');
    }

    return (<Welcome/>);
}
