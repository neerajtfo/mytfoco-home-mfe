import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Heading Font Name';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('/fonts/Gotham-Book.woff2') format('woff2'); 
      }
      `}
  />
);

export default Fonts;
