import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

import mainImage from "assets/images/base/tour.jpg";

import data from "../data";

const { tour } = data;

function TourPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];

    return (
        <>
            <Helmet>
                <title>{t("tour_page.seo_title")}</title>
                <meta name="description" content={t("tour_page.seo_title")} />
            </Helmet>
            <div className="content fade-in content-tour">
                <div className="main-banner">
                    <img src={mainImage} alt="" className="main-photo" />
                </div>
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("tour_page.title")}
                        </h1>
                    </div>
                </div>
                <div className="tour-block">
                    <div className="header">
                        <div className="upcoming"></div>
                        <div className="local"></div>
                        <div className="social"></div>
                    </div>
                    <div className="events">
                        {tour.events.map((event, index) => (
                            event[currentLang].year
                                ? <div className="events-year">{event[currentLang].year}</div>
                                : (
                                    <div className="event">
                                        <div className="event-date">
                                            {event[currentLang].dateString
                                                ? event[currentLang].dateString
                                                : new Date(event.date).toLocaleDateString(currentLang, { day: "numeric", month: "short" })
                                            }
                                        </div>
                                        <div className="event-place">
                                            {event[currentLang].place}
                                        </div>
                                        <div className="event-location">
                                            {event[currentLang].location}
                                        </div>
                                        {event.toTickets &&
                                            <div className="event-tickets">
                                                <a className="link" href={event.toTickets} alt="ticket" target="_blank" rel="noopener noreferrer">
                                                    {event[currentLang].buttonText
                                                        ? event[currentLang].buttonText
                                                        : t("tour_page.button")
                                                    }
                                                </a>
                                            </div>
                                        }
                                    </div>
                                )
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TourPage;
