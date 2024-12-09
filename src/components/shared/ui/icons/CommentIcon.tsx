export const CommentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="30"
    height="31"
    viewBox="0 0 30 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect y="0.64917" width="30" height="30" fill="url(#pattern0_356_78)" />
    <defs>
      <pattern
        id="pattern0_356_78"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_356_78" transform="scale(0.0078125)" />
      </pattern>
      <image
        id="image0_356_78"
        width="128"
        height="128"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);
