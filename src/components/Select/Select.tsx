import {
  SelectGroup as HeadlessSelectGroup,
  SelectListBox as HeadlessSelectListBox,
  SelectMarker as HeadlessSelectMarker,
  SelectOption as HeadlessSelectOption,
  SelectRoot as HeadlessSelectRoot,
  SelectValue as HeadlessSelectValue,
} from "@qwik-ui/headless";
import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

export const SelectRoot = HeadlessSelectRoot;

const selectGroupVariants = cva({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4",
  },
});

export const SelectGroup = styled(HeadlessSelectGroup, selectGroupVariants);

const selectValueVariants = cva({
  base: {},
});

export const SelectValue = styled(HeadlessSelectValue, selectValueVariants);

const selectMarkerVariants = cva({
  base: {
    width: "6",
    height: "6",
  },
});

export const SelectMarker = styled(HeadlessSelectMarker, selectMarkerVariants);

const selectListBoxVariants = cva({
  base: {},
});

export const SelectListBox = styled(
  HeadlessSelectListBox,
  selectListBoxVariants,
);

const selectOptionVariants = cva({
  base: {
    padding: "4",
  },
});

export const SelectOption = styled(HeadlessSelectOption, selectOptionVariants);
