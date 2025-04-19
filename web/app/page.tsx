import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Open Hitster</h1>
        <a href="https://github.com/daniel-heg/open-hitster">
          Checkout GitHub repo here
        </a>
      </main>
    </div>
  );
}
