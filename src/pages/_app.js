import "../styles/globals.css";
import { useEffect } from "react"; // Import Tailwind di sini

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
