import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import data from "../data";


function PressPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];
    const { hiResImages } = data;

    return (
        <>
            <Helmet>
                <title>{t("images_page.seo_title")}</title>
                <meta name="description" content={t("images_page.seo_title")} />
            </Helmet>
            <div className="content fade-in content-images">
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("images_page.title")}
                        </h1>
                    </div>
                </div>
                <div className="images">
                    {hiResImages.items.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {item.fileName && item.previewfileName &&
                                    <a href={process.env.PUBLIC_URL + "/press/images/" + item.fileName} className="img-link" download>
                                        <div className="img-wrap">
                                            <img src={process.env.PUBLIC_URL + "/press/images/" + item.previewfileName} alt={item.alt || ""} />
                                            <span>
                                                <FontAwesomeIcon icon={faDownload} />
                                                {hiResImages.downloadName[currentLang]}
                                            </span>
                                        </div>
                                    </a>
                                }
                            </Fragment>
                        );
                    })}
                </div>

            </div>
        </>
    );
}

export default PressPage;
