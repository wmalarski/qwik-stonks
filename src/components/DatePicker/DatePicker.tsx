import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

const datePickerVariants = cva({
  base: {
    display: "inline-flex",
    flexShrink: 0,
    cursor: "pointer",
    userSelect: "none",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    borderColor: ["transparent", "base.200"],
    textAlign: "center",
    borderRadius: "sm",
    height: "3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: ".875rem",
    lineHeight: ["1.25rem", "1em"],
    minHeight: "3rem",
    gap: ".5rem",
    fontWeight: 600,
    textDecorationLine: "none",
    borderWidth: "thin",

    outlineColor: "base.content",

    _focusVisible: {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineOffset: "2px",
    },

    _disabled: {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "base.200",
        color: "base.content",
        _hover: {
          borderColor: "base.300",
          backgroundColor: "base.300",
        },
      },
      neutral: {
        borderColor: "neutral",
        backgroundColor: "neutral",
        color: "neutral.content",
        outlineColor: "neutral",
        _hover: {
          borderColor: "neutral.focus",
          backgroundColor: "neutral.focus",
        },
      },
      primary: {
        borderColor: "primary",
        backgroundColor: "primary",
        color: "primary.content",
        outlineColor: "primary",
        _hover: {
          borderColor: "primary.focus",
          backgroundColor: "primary.focus",
        },
      },
      secondary: {
        borderColor: "secondary",
        backgroundColor: "secondary",
        color: "secondary.content",
        outlineColor: "secondary",
        _hover: {
          borderColor: "secondary.focus",
          backgroundColor: "secondary.focus",
        },
      },
      accent: {
        borderColor: "accent",
        backgroundColor: "accent",
        color: "accent.content",
        outlineColor: "accent",
        _hover: {
          borderColor: "accent.focus",
          backgroundColor: "accent.focus",
        },
      },
    },
    size: {
      default: { height: "10", px: "4", py: "2" },
      sm: { height: "9", borderRadius: "md", px: "3" },
      lg: { height: "11", borderRadius: "md", px: "8" },
      icon: { height: "10", width: "10" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const DatePicker = styled("input", datePickerVariants);
