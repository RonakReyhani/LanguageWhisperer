import "@/styles/globals.css";

import { StylesProvider, ThemeProvider } from "@mui/styles";
import type { AppProps } from "next/app";
import Theme from "../components/Theme/theme";
import { WhispererProvider } from "@/providers/WhispererProvider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider>
      <ThemeProvider theme={Theme}>
        <WhispererProvider>
          <Component {...pageProps} />
        </WhispererProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
