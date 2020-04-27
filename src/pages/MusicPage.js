import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import AudioPlayer from "../components/mediaPlayer/AudioPlayer";
import data from "../data";

const { music, video } = data;

function MusicPage() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.languages[0];

    return (
        <>
            <Helmet>
                <title>{t("music_page.seo_title")}</title>
                <meta name="description" content={t("music_page.seo_description")} />
            </Helmet>
            <div className="content fade-in content-music">
                <div className="block block-main-title">
                    <div className="title-wrap">
                        <h1 className="title">
                            {t("music_page.title")}
                        </h1>
                    </div>
                </div>
                <div className="video-player-block">
                    <h2 className="title">
                        {t("music_page.video_title")}
                    </h2>
                    {video.tracks.map((track, index) => (
                        <div className="video-track" key={index}>
                            <div className="video">
                                <ReactPlayer
                                    className='react-player'
                                    url={track.url}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            <div className="video-info">
                                <div className="video-title">
                                    <span className="label">{track[currentLang] && track[currentLang].label}</span>
                                    <span className="track-name">{track[currentLang] && track[currentLang].trackName}</span>
                                </div>
                                <div className="video-description">
                                    {track[currentLang] && track[currentLang].description}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="youtube-links">
                        {video.youtube_chanel_links.map((link, index) => (
                            <div className="youtube-link" key={index}>
                                {link.url &&
                                    <a href={link.url} className="youtube-chanel-link" target="_blank" rel="noopener noreferrer">
                                        <span><FontAwesomeIcon icon={faYoutube} /></span>
                                        {link[currentLang].title}
                                    </a>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="audio-player-block">
                    <h2 className="title">
                        {t("music_page.audio_title")}
                    </h2>
                    <div className="audio-player">
                        <AudioPlayer tracks={music.tracks} />
                    </div>
                    <div className="audio-subtitle">
                        {music.albumTitle[currentLang]}
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default MusicPage;
