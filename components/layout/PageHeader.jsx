import Link from "next/link";
import config from "../../config";

export default function ({ title }) {
  return (
    <div>
      <Link href="/">
        <a>
          <img src={config.logo} />
        </a>
      </Link>
      <h1>{title}</h1>
    </div>
  )
}
