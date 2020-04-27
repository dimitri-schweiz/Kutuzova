import React, { Component } from "react";
import ReactPlayer from "react-player";
import { withTranslation } from "react-i18next";
import classNames from "classnames";

//import coverImage from "assets/images/base/music.jpg";

import Duration from "./duration";
import Timeline from "./timeline";
import Volume from "./volume";

import "./styles/player.scss";

const Icons = {
    play: <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><path d="M16,12V30l7-4.5L30,21l-7-4.5ZM21,0A21,21,0,1,0,42,21,21,21,0,0,0,21,0Zm0,41A20,20,0,1,1,41,21,20.023,20.023,0,0,1,21,41Z"></path></svg>,
    pause: <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" ><path d="M21,0C9.4,0,0,9.4,0,21s9.4,21,21,21s21-9.4,21-21S32.6,0,21,0z M21,41C10,41,1,32,1,21S10,1,21,1s20,9,20,20 C41,32,32,41,21,41z M14,30h4V12h-4C14,12,14,30,14,30z M24,30h4V12h-4V30z"></path></svg>,
    previous: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M10,13.625L13,15.5,17,18V8l-4,2.5-3,1.875V8H9V18h1V13.625ZM13,26A13,13,0,1,0,0,13,13,13,0,0,0,13,26ZM13,1A12,12,0,1,1,1,13,12.014,12.014,0,0,1,13,1Z"></path></svg>,
    next: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M16,12.375L13,10.5,9,8V18l4-2.5,3-1.875V18h1V8H16v4.373ZM13,0A13,13,0,1,0,26,13,13,13,0,0,0,13,0Zm0,25A12,12,0,1,1,25,13,12.014,12.014,0,0,1,13,25Z"></path></svg>,
    volume: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 13"><path d="M7.3,1.171c-0.5.347-3.492,2.556-3.683,2.69a0.6,0.6,0,0,1-.517.121l-2.088,0a1,1,0,0,0-1,1l0,3a1,1,0,0,0,1,1l2.071,0a0.752,0.752,0,0,1,.607.143c0.2,0.145,3.163,2.379,3.6,2.709s0.7,0.133.7-.343L8,1.516C8,1.018,7.833.8,7.3,1.171ZM14.063,13a0.5,0.5,0,0,1-.356-0.849A8.077,8.077,0,0,0,13.663.834a0.5,0.5,0,1,1,.707-0.7,9.075,9.075,0,0,1,.049,12.722A0.494,0.494,0,0,1,14.063,13Zm-3-2.017a0.5,0.5,0,0,1-.386-0.815,5.8,5.8,0,0,0-.022-7.351,0.5,0.5,0,1,1,.767-0.638,6.793,6.793,0,0,1,.026,8.621A0.5,0.5,0,0,1,11.063,10.986Z"></path></svg>,
    volumeMute: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 11"><path d="M7.289,0.179c-0.5.347-3.49,2.552-3.681,2.685a0.6,0.6,0,0,1-.517.121l-2.087,0a1,1,0,0,0-1,1l0,3a1,1,0,0,0,1,1l2.069,0a0.752,0.752,0,0,1,.607.143c0.2,0.144,3.161,2.375,3.6,2.7s0.7,0.133.7-.343L7.992,0.524C7.993,0.026,7.826-.191,7.289.179ZM14.2,5.46l2.642-2.643a0.5,0.5,0,1,0-.709-0.709L13.488,4.751,10.846,2.108a0.5,0.5,0,0,0-.709.709L12.779,5.46,10.137,8.1a0.5,0.5,0,1,0,.709.709l2.642-2.643,2.642,2.643A0.5,0.5,0,1,0,16.838,8.1Z"></path></svg>,
    trackPlay: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 19"><path d="M1575,629.5l-14,9.5V620Z" transform="translate(-1561 -620)"></path></svg>,
    trackPause: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 19"><path d="M264,700h4v19h-4V700Zm11,0h4v19h-4V700Z" transform="translate(-264 -700)"></path></svg>
};

class AudioPlayer extends Component {
    state = {
        currentTrackIndex: 0,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.5,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        isVolumeOpen: false,
        trackHover: null
    }

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        });
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing });
    }

    handleStop = () => {
        this.setState({ url: null, playing: false });
    }

    handleToggleControls = () => {
        const url = this.state.url;
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url));
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light });
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop });
    }

    handleVolumeChange = (e, value) => {
        this.setState({ volume: parseFloat(value) });
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    }

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) });
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip });
    }

    handlePlay = () => {
        this.setState({ playing: true });
    }

    handleEnablePIP = () => {
        this.setState({ pip: true });
    }

    handleDisablePIP = () => {
        this.setState({ pip: false });
    }

    handlePause = () => {
        this.setState({ playing: false });
    }

    handleSeekMouseDown = (e, value) => {
        this.setState({ seeking: true });
    }

    handleSeekChange = (e, value) => {
        this.setState({ played: parseFloat(value) });
        this.player.seekTo(parseFloat(value));
    }

    handleSeekMouseUp = (e, value) => {
        this.setState({ seeking: false });
    }

    handleProgress = state => {
        if (!this.state.seeking) {
            this.setState(state);
        }
    }

    handleEnded = () => {
        this.setState({ playing: this.state.loop });
    }

    handleDuration = (duration) => {
        this.setState({ duration });
    }

    handleClickFullscreen = () => {

    }

    handelPlayPauseTrack = index => {
        if (this.state.currentTrackIndex === index) {
            return this.setState({
                playing: !this.state.playing
            });
        }

        this.setState({
            currentTrackIndex: index,
            playing: true
        });
    }

    handleNext = () => {
        const { tracks } = this.props;
        const nextTrackIndex = this.state.currentTrackIndex + 1 > tracks.length - 1 ? 0 : this.state.currentTrackIndex + 1;
        this.setState({
            currentTrackIndex: nextTrackIndex,
            playing: true
        });
    }

    handlePrevious = () => {
        const { tracks } = this.props;
        debugger;
        const prevTrackIndex = this.state.currentTrackIndex - 1 < 0 ? tracks.length - 1 : this.state.currentTrackIndex - 1;
        this.setState({
            currentTrackIndex: prevTrackIndex,
            playing: true
        });
    }

    ref = player => {
        this.player = player;
    }


    render() {
        const { tracks, i18n } = this.props;
        const currentLang = i18n.languages[0];
        const { currentTrackIndex, playing, controls, light, volume, muted, loop, played, duration, playbackRate, pip, isVolumeOpen } = this.state;
        const currentTrack = tracks[currentTrackIndex];

        return (
            <>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    url={process.env.PUBLIC_URL + "/audio/" + currentTrack.fileName}
                    width='100%'
                    height='100%'
                    config={{
                        file: { forceAudio: true }
                    }}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log("onReady")}
                    onStart={() => console.log("onStart")}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log("onBuffer")}
                    onSeek={e => console.log("onSeek", e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log("onError", e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                />
                {/* <div className="cover-wrapper">
                    <div className="cover-image">
                        <img src={coverImage} alt="" className="album-cover" />
                    </div>
                </div> */}
                <div className="control-wrapper">
                    <div className="title-wrapper">
                        <div className="track-name">{currentTrack[currentLang] && currentTrack[currentLang].trackName}</div>
                        <div className="album-name">{currentTrack[currentLang] && currentTrack[currentLang].album}</div>
                    </div>
                    <div className="timeline-wrapper">
                        <div className="elapsed">
                            <Duration seconds={duration * played} />
                        </div>
                        <div className="timeline">
                            <Timeline
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                                min={0}
                                step={0.05}
                                max={1}
                                value={played}
                            />
                        </div>
                        <div className="duration">
                            <Duration seconds={duration} />
                        </div>
                    </div>
                    <div className="control-panel">
                        <div className="volume">
                            {isVolumeOpen &&
                                <div
                                    className="volume-slider"
                                    onMouseLeave={() => this.setState({ isVolumeOpen: false })}
                                >
                                    <Volume
                                        defaultValue={volume}
                                        min={0}
                                        step={0.05}
                                        max={1}
                                        onChange={this.handleVolumeChange}
                                    />
                                </div>
                            }
                            <div
                                className="volume-icon"
                                onClick={this.handleToggleMuted}
                                onMouseEnter={() => this.setState({ isVolumeOpen: true })}>
                                {!muted
                                    ? Icons.volume
                                    : Icons.volumeMute
                                }
                            </div>
                        </div>
                        <div className="previous" onClick={this.handlePrevious}>
                            {Icons.previous}
                        </div>
                        <div className="play-stop" onClick={this.handlePlayPause}>
                            {!playing
                                ? Icons.play
                                : Icons.pause
                            }
                        </div>
                        <div className="next" onClick={this.handleNext}>
                            {Icons.next}
                        </div>
                    </div>
                </div>
                <div className="tracks">
                    {tracks.map((track, index) => (
                        <div
                            className={classNames("track", { "active": index === this.state.currentTrackIndex, "hover": index === this.state.trackHover })}
                            key={index}
                            onClick={() => this.handelPlayPauseTrack(index)}
                            onMouseEnter={() => this.setState({ trackHover: index })}
                            onMouseLeave={() => this.setState({ trackHover: null })}
                        >
                            <div className="track-control">
                                {index === this.state.currentTrackIndex
                                    ? !playing
                                        ? <div className="track-play">{Icons.trackPlay}</div>
                                        : <div className="track-pause">{Icons.trackPause}</div>
                                    : index === this.state.trackHover
                                        ? <div className="track-play">{Icons.trackPlay}</div>
                                        : <div className="track-number">{index + 1}</div>
                                }
                            </div>
                            <div className="track-title">{track[currentLang] && track[currentLang].trackName}</div>
                            <div className="track-duration"></div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default withTranslation()(AudioPlayer);
