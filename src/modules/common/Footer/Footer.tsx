import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";
import { css } from "~/styled-system/css";

export const Footer = component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div
        class={css({
          marginX: "auto",
          paddingY: "12",
          paddingX: "20",
          smDown: {
            paddingY: "8",
            paddingX: "10",
          },
        })}
      >
        <a
          href="https://www.builder.io/"
          target="_blank"
          class={css({
            color: "white",
            display: "block",
            fontSize: "small",
            textAlign: "center",
            textDecoration: "none",
            lineHeight: "normal",
          })}
        >
          <span class={css({ display: "block" })}>
            Made with ♡ by Builder.io
          </span>
          <span class={css({ display: "none", paddingX: "4" })}>|</span>
          <span class={css({ display: "block" })}>{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
