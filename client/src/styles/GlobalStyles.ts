import { createGlobalStyle } from "styled-components";
import { respondTo } from "../utils/helpers/_respondTo";
import {
  FontSize,
  SVGStyles,
  TextStyles,
  InputStyles,
  FontFamilies,
  ButtonStyles,
  DefaultStyles,
} from "./baseStyles";

// Export Global styles
const GlobalStyle = createGlobalStyle`

${FontFamilies}
${DefaultStyles}
${TextStyles}
${SVGStyles}
${InputStyles}
${ButtonStyles}

/* On touch devices cursor should not be pointer */
${respondTo.mobile`
  & * {cursor:default !important;}
`}

${respondTo.smallTablet`
  & * {cursor:default !important;}
`}

${respondTo.tablet`
  & * {cursor:default !important;}
`}

${respondTo.laptop`
  & * {cursor:default !important;}
`}

/* Variables */
:root {

  /* Colors */
  --primary: rgb(156, 54, 181);
  --primaryWithOpacity:  rgb(156, 54, 181, 0.7);
  --error: #d31027;

  --gradient-primary: linear-gradient(326deg, #a4508b 0%, #5f0a87 74%);
  --gradient-primaryWithOpacity: linear-gradient(326deg, rgba(164, 80, 139, 0.8) 0%, rgba(95, 10, 135, 0.8) 74%);
  --gradient-secondary:linear-gradient(336deg, #a4508b 0%, darkmagenta 74%);
  --gradient-secondaryWithOpacity: linear-gradient(336deg, rgba(164, 80, 139, 0.9) 0%, rgba(139, 0, 139, 0.9) 74%);
  --gradient-red: linear-gradient(to right, #ea384d, #d31027);

  --magenta: rgb(139, 0,139);
  --magentaWithOpacity: rgba(139, 0, 139,0.7);

  --secondary: #a4508b;
  --secondaryWithOpacity: rgba(164, 80, 139, 0.7);
  
  --red: rgba(211,16,39,0.9);
  --redWithOpacity:rgba(211,16,39,0.7);
  
  --black: rgb(11, 11, 11);
  --blackWithOpacity: rgba(11, 11, 11, 0.7);

  --white: white;
  --whiteWithOpacity: rgba(255, 255, 255, 0.7);

  --whiteSmoke: whitesmoke;

  /* Font size */
  --xx-medium: 1.8rem;
  --x-medium: 1.6rem;
  --medium: 1.4rem;
  --small: 1.2rem;
  --x-small: 1rem;
  --xx-large: 3rem;
  --x-large: 2.5rem;

  ${FontSize}
}
`;

export default GlobalStyle;
