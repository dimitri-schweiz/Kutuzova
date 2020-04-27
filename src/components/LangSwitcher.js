import React from "react";
import { useTranslation } from "react-i18next";

import { languages } from "../utils/i18next";

import "../themes/styles/navMenu.scss";


function LangSwitcher() {
    const { i18n } = useTranslation();

    const langClass = lang => {
        return i18n.languages[0] === lang ? "lang active" : "lang";
    };

    return (
        <>
            {languages.map((lang, index) => (
                <span className={langClass(lang)} onClick={() => i18n.changeLanguage(lang)} key={index}>{lang}</span>
            ))}
        </>
    );
}

export default LangSwitcher;
