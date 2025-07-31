import { styled } from "styled-components";
import { Language, IconContainer } from "./languageStyles";
import i18next from "i18next";

const DropdownContainer = styled.div`
  z-index: 1;
  display: none;
  bottom: 4px;
  &:hover {
    display: flex;
  }
`;

const DropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 20px;
  background-color: var(--secondary);
`;

type Language = {
  lang: string;
  icon: () => JSX.Element;
};

interface DropdownProps {
  languages: Language[];
}

function Dropdown({ languages }: DropdownProps) {
  return (
    <DropdownContainer className="w3-animate-top">
      <DropDown>
        {/* Map all languages */}
        {languages.map((language) => (
          <Language
            key={language.lang}
            onClick={() => i18next.changeLanguage(language.lang)}
          >
            <IconContainer>
              <language.icon />
            </IconContainer>
            {language.lang}
          </Language>
        ))}
      </DropDown>
    </DropdownContainer>
  );
}

export default Dropdown;
