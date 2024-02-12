"use client";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Nav } from "./components/Nav";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";
import { orderApi } from "./api/order/orderApi";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <ApiProvider api={orderApi}>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Nav />
            <main className={styles.main}>{props.children}</main>
            <footer className={styles.footer}>
              <span>Question 1 - Code Sample </span>
            </footer>
          </section>
        </body>
      </html>
    </ApiProvider>
  );
}
