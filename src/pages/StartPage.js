import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import mainImage from "assets/images/base/start.jpg";

import Quote from "../components/Quote";
import data from "../data";

function StartPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];
    const { startPage } = data;

    return (
        <>
            <Helmet>
                <title>{t("start_page.seo_title")}</title>
                <meta name="description" content={t("start_page.seo_title")} />
            </Helmet>
            <div className="content content-home fade-in">
                <div className="main-banner">
                    <img src={mainImage} alt="" className="main-photo" />
                </div>
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("start_page.title")}
                        </h1>
                    </div>
                    <div className="subtitle-wrap">
                        <div className="subtitle">
                            {t("start_page.subtitle")}
                        </div>
                    </div>
                </div>
                <div className="main-quotes">
                    {startPage[currentLang].quotes.map((quote, index) => (
                        <Quote
                            quote={quote}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default StartPage;
