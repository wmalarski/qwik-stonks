import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

const dividerVariants = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "4",
    marginBottom: "4",
    height: "4",
    whiteSpace: "nowrap",

    _focusVisible: {
      outline: "auto",
    },

    "&:not": {
      _empty: {
        gap: "4",
      },
    },

    _before: {
      content: '""',
      flexGrow: 1,
      height: "0.5",
      width: "full",
    },
    _after: {
      content: '""',
      flexGrow: 1,
      height: "0.5",
      width: "full",
    },
  },
});

export const Divider = styled("span", dividerVariants);
