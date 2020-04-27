import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import mainImage from "assets/images/base/contact.jpg";

import data from "../data";

function ContactPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];
    const { contacts } = data;

    return (
        <>
            <Helmet>
                <title>{t("contact_page.seo_title")}</title>
                <meta name="description" content={t("contact_page.seo_title")} />
            </Helmet>
            <div className="content fade-in content-contact">
                <div className="main-banner">
                    <img src={mainImage} alt="" className="main-photo" />
                </div>
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("contact_page.title")}
                        </h1>
                    </div>
                </div>
                <div className="contacts-block">
                    {contacts.items.map((contact, index) => (
                        <div className={"contact contact-" + (index + 1)}>
                            <div className="contact-name">
                                {contact.title[currentLang]}
                            </div>
                            <div className="contact-email">
                                <a href={`mailto:${contact.email}`}>
                                    {contact.email}
                                </a>
                            </div>
                            <div className="contact-phone">
                                {contact.phoneNumber}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ContactPage;
