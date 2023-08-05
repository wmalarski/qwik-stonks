import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "~/components/icons/QwikLogo";
import { css } from "~/styled-system/css";

type NavLinkProps = {
  label: string;
  href: string;
};

export const NavLink = component$<NavLinkProps>((props) => {
  return (
    <li
      class={css({
        display: "inline-block",
        margin: 0,
        padding: 0,
        fontSize: "small",
        smDown: {
          display: "none",
        },
      })}
    >
      <a
        href={props.href}
        target="_blank"
        class={css({
          color: "white",
          display: "inline-block",
          padding: 0,
          textDecoration: "none",
          _hover: {
            color: "blue.500",
          },
        })}
      >
        {props.label}
      </a>
    </li>
  );
});

export const Header = component$(() => {
  return (
    <header>
      <div
        class={css({
          marginX: "auto",
          paddingY: "12",
          paddingX: "20",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          smDown: {
            paddingY: "8",
            paddingX: "10",
          },
        })}
      >
        <div class={css({ display: "inline-block" })}>
          <a href="/" title="qwik" class={css({ display: "block" })}>
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        <ul
          class={css({
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            gap: "8",
            paddingLeft: "5",
          })}
        >
          <NavLink
            href="https://qwik.builder.io/docs/components/overview/"
            label="Docs"
          />
          <NavLink
            href="https://qwik.builder.io/examples/introduction/hello-world/"
            label="Examples"
          />
          <NavLink
            href="https://qwik.builder.io/tutorial/welcome/overview/"
            label="Tutorials"
          />
        </ul>
      </div>
    </header>
  );
});
