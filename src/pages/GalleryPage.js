import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import Gallery from "components/gallery";

import data from "../data";

function GalleryPage() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t("start_page.seo_title")}</title>
                <meta name="description" content={t("start_page.seo_title")} />
            </Helmet>
            <div className="content content-gallery fade-in">
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("gallery_page.title")}
                        </h1>
                    </div>
                </div>
                <Gallery items={data.gallery} />
            </div>
        </>
    );
}

export default GalleryPage;
