import "../styles/globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-jakarta",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={jakartaSans.variable}>
      <Component {...pageProps} />
    </main>
  );
}
