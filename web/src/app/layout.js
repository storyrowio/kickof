'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HolyLoader from "holy-loader";
import {SWRConfig} from "swr";
import {Provider} from "react-redux";
import RootApp from "layouts/Root";
import store from "store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
        <title>KickOf</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <HolyLoader color="#757575"/>
      <SWRConfig value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshInterval: 0,
      }}>
          <Provider store={store}>
              <RootApp>
                  {children}
              </RootApp>
          </Provider>
      </SWRConfig>
      </body>
      </html>
  );
}
