export const QwikLogo = ({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    fill="none"
    height={height}
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
