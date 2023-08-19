import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

const cardVariants = cva({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    borderRadius: "md",
    boxShadow: "xl",

    _focus: {
      outline: "2px solid transparent",
      outlineOffset: "2px",
    },

    _focusVisible: {
      outline: "2px solid currentColor",
      outlineOffset: "2px",
    },
  },
});

export const Card = styled("div", cardVariants);

export const cardBodyVariants = cva({
  base: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    padding: "8",
    gap: "1",
  },
});

export const CardBody = styled("div", cardBodyVariants);
