// Import font families
import GeoFonts from "../../static/fonts/pbg-arial";

// Export Global font  families
export const FontFamilies = `
@font-face {
    font-family: "BPG Arial Caps";
    src: url(${GeoFonts.PbgArialCapsEOT});
    src: url(${GeoFonts.PbgArialCapsEOT}?#iefix) format("embedded-opentype"),
      url(${GeoFonts.PbgArialCapsTTF}) format("truetype"),
      url(${GeoFonts.PbgArialCapsWOFF}) format("woff"),
      url(${GeoFonts.PbgArialCapsWOFF2}) format("woff2"),
      url(${GeoFonts.PbgArialCapsSVG}#bpg-arial-caps) format("svg");
    font-weight: normal;
    font-style: normal;
    unicode-range: U+10D0 - U+10FF
  }

`;
