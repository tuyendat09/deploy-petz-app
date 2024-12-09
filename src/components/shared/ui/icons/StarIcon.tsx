export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect
      y="0.64917"
      width="14"
      height="14"
      fill="url(#pattern0_356_74)"
      fillOpacity="0.7"
    />
    <defs>
      <pattern
        id="pattern0_356_74"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_356_74" transform="scale(0.0078125)" />
      </pattern>
      <image
        id="image0_356_74"
        width="128"
        height="128"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
