import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";
import { css } from "~/styled-system/css";
import styles from "./footer.module.css";

export const Footer = component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer
      class={css({
        padding: 10,
        bg: "red.400",
        height: "dvh",
        margin: 100,
        fontSize: 30,
      })}
    >
      <div class="container">
        <a href="https://www.builder.io/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ by Builder.io</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
