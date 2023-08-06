import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

const buttonVariants = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "md",
    fontSize: "sm",
    fontWeight: "medium",
    // ring-offset-background transition-colors
    _focusVisible: {
      outline: "none",
      ringOffset: "0.5",
      ringColor: "red.200",
      ringWidth: "0.5",
    },
    _disabled: {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "bg-primary",
        color: "text-primary-foreground",
        _hover: {
          backgroundColor: "bg-primary/90",
        },
      },
      outline: {
        border:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      secondary: {
        backgroundColor: "bg-secondary",
        color: "text-secondary-foreground",
        _hover: {
          backgroundColor: "bg-secondary/80",
        },
      },
      ghost: {
        _hover: {
          backgroundColor: "hover:bg-accent",
          color: "text-accent-foreground",
        },
      },
      link: {
        //  underline-offset-4 hover:underline
        color: "text-primary",
        textUnderlineOffset: 4,
        _hover: {
          textUnderlinePosition: "under",
        },
      },
    },
    size: {
      default: { height: "h-10 px-4 py-2" },
      sm: { height: "h-9 rounded-md px-3" },
      lg: { height: "h-11 rounded-md px-8" },
      icon: { height: "h-10 w-10" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export const Button = styled("button", buttonVariants);
