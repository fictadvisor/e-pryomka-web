import Welcome from "../components/welcome/welcome";
import Head from "next/head";

export default function Root() {
    return (<>
        <Head>
            <title>Welcome to FICT! 🚀</title>
        </Head>
        <Welcome/>
    </>);
}