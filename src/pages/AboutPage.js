import mainImage from "assets/images/base/about.jpg";
import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import Quote from "../components/Quote";
import data from "../data";

function AboutPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];
    const { bio } = data;

    return (
        <>
            <Helmet>
                <title>{t("about_page.seo_title")}</title>
                <meta name="description" content={t("about_page.seo_title")} />
            </Helmet>
            <div className="content fade-in content-about">
                <div className="main-banner">
                    <img src={mainImage} alt="" className="main-photo" />
                </div>
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("about_page.title")}
                        </h1>
                    </div>
                </div>
                <div className="about-text-block">
                    <div className="quotes">
                        <div className="inner">
                            {bio[currentLang].quotes.map((quote, index) => (
                                <Quote
                                    quote={quote}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="about-text">
                        <div dangerouslySetInnerHTML={{ __html: bio[currentLang].bioText }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;
