import type { AppProps } from "next/app";
import { Provider, createClient } from "wagmi";

import "../styles/globals.css";

const client = createClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={client}>
      <Component {...pageProps} />{" "}
    </Provider>
  );
}

export default MyApp;
