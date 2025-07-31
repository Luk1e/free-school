import { styled } from "styled-components";
import { IconContainer, Language } from "./languageStyles";
import { languageIcons } from "../../../../static/svg";
import Dropdown from "./Dropdown";

// Container component
const Container = styled.div`
  position: relative;
  display: flex;
  height: auto;
  flex-direction: column;

  &:hover {
    & div {
      display: flex;
    }
  }
`;

function Translate({ i18n }: any) {
  //  Destructure icons
  const { GeorgianSVG, EnglishSVG } = languageIcons;

  const languages = [
    { lang: "geo", icon: GeorgianSVG },
    { lang: "eng", icon: EnglishSVG },
  ];

  let selectedLanguage = languages.find(
    (language) => language.lang === i18n.language
  );

  // avoid error if selected language is null
  selectedLanguage = selectedLanguage
    ? selectedLanguage
    : { lang: "eng", icon: () => <div></div> };

  return (
    <Container>
      {/* Selected language */}
      <Language>
        <IconContainer>
          <selectedLanguage.icon />
        </IconContainer>
        {selectedLanguage.lang}
      </Language>

      {/* Dropdown component */}
      <Dropdown languages={languages} />
    </Container>
  );
}

export default Translate;
