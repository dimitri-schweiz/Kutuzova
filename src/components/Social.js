import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faVk, faTwitter, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

import data from "data";

function Social() {

    return (
        <div className="social-wrap">
            {data.social.links.facebook &&
                <a href={data.social.links.facebook} alt="" target="_blank" rel="noopener noreferrer">
                    <span><FontAwesomeIcon icon={faFacebookF} /></span>
                </a>
            }
            {data.social.links.instagram &&
                <a href={data.social.links.instagram} alt="" target="_blank" rel="noopener noreferrer">
                    <span><FontAwesomeIcon icon={faInstagram} /></span>
                </a>
            }
            {data.social.links.vk &&
                <a href={data.social.links.vk} alt="" target="_blank" rel="noopener noreferrer">
                    <span><FontAwesomeIcon icon={faVk} /></span>
                </a>
            }
            {data.social.links.twitter &&
                <a href={data.social.links.twitter} alt="" target="_blank" rel="noopener noreferrer">
                    <span><FontAwesomeIcon icon={faTwitter} /></span>
                </a>
            }
            {data.social.links.youtube &&
                <a href={data.social.links.youtube} alt="" target="_blank" rel="noopener noreferrer">
                    <span><FontAwesomeIcon icon={faYoutube} /></span>
                </a>
            }
        </div>
    );
}

export default Social;
