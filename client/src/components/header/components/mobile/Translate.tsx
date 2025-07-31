import { styled } from "styled-components";
import { DropDown, Item, IconContainer } from "./languageStyles";
import { languageIcons } from "../../../../static/svg";
import { useState } from "react";
import i18next from "i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
`;

function Translate({ i18n }: any) {
  const { GeorgianSVG, EnglishSVG } = languageIcons;
  const [isOpen, setIsOpen] = useState(false);
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

  const languageChanger = (lang: string) => {
    i18next.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <Container>
      {/* Dropdown component */}
      {isOpen && (
        <DropDown className="w3-animate-right">
          {/* <Dropdown languages={languages} /> */}
          {languages.map((language) => (
            <Item
              key={language.lang}
              onClick={() => languageChanger(language.lang)}
            >
              <IconContainer>
                <language.icon />
              </IconContainer>
              {language.lang}
            </Item>
          ))}
        </DropDown>
      )}

      {/* Selected language */}
      <Item $left="true" onClick={() => setIsOpen(!isOpen)}>
        <IconContainer>
          <selectedLanguage.icon />
        </IconContainer>
        {selectedLanguage.lang}
      </Item>
    </Container>
  );
}

export default Translate;
