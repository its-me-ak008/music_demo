import * as React from 'react';
import { Music, NextIcon, NoRepeat, PauseIcon, PlayIcon, RepeatAll, RepeatOne, SoundHighIcon, SoundLowIcon } from './svgicons';

interface typeprops {
    song: any,
    next: any,
    prev: any,
}

const SingleSong = React.forwardRef((props: typeprops, ref: any) => {
    const songref: any = React.useRef()
    const [position, setPosition] = React.useState(0);
    const [paused, setPaused] = React.useState(true);
    const [duration, setDuration] = React.useState(0); // seconds
    const [songVolume, setSongVolume]: any = React.useState(10);
    const [repeat, setRepeat]: any = React.useState("repeat");

    React.useImperativeHandle(ref, () => ({
        play() {
            songref.current.play()
        }
    }))

    React.useEffect(() => {
        songref?.current?.play();
    }, [props.song])

    React.useEffect(() => {
        window.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                return spacefn();
            }
        });
        songref.current.volume = songVolume / 100;
        return () => {
            window.removeEventListener("keyup", () => { });
        };
    }, [])

    const spacefn = () => {
        songref.current.paused ? songref.current.play() : songref.current.pause()
    }

    const formatDuration = (value: number) => {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const onLoadedMetadata = () => {
        if (songref.current) {
            setDuration(Math.floor(songref.current.duration))
            songref.current.volume = songVolume / 100;
        }
    };
    const onTimeUpdate = () => {
        setPosition(Math.floor(songref.current.currentTime))
    }
    const onEnded = () => {
        if (repeat == "repeatall") {
            props.next(-1);
        }
        if (repeat == "norepeat") {
            setDuration(Math.floor(songref.current.duration));
            setPosition(0);
            songref.current.pause();
        }
    }

    return (
        <div className='mu-asw-songpanel'>
            <div className='mu-asw-songcontent'>
                <div className='mu-asw-topcontent'>
                    <div className='mu-asw-contentimg'>
                        {/* <img
                            style={{ height: "100%", objectFit: "cover" }}
                            alt="can't win - Chilling Sunday"
                            src={props.song?.thmbnail ? props.song?.thmbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRRLllmkEeMbYJ2JV6nj-DvUq8WGaAVhbdYPOFqg_7Nsw3UIdzF6sVZtgtZE46eoSsEw&usqp=CAU"}
                        /> */}
                        <div className="mu-asw-nothumb">
                            <Music color="var(--mu-asw-text-theme)" />
                        </div>
                    </div>
                    <div>
                        <p className='mu-asw-album'>{props.song.album}</p>
                        <p className='mu-asw-songname'>{props.song?.songname}</p>
                        <p className='mu-asw-description'>{props.song?.shortdesc}</p>
                    </div>
                </div>
                <div className="mu-asw-bottomcontent">
                    <input
                        type="range"
                        value={position}
                        min={0}
                        step={1}
                        max={duration}
                        className="mu-asw-timeslider"
                        onChange={(e: any) => {
                            songref.current.currentTime = e.target.value;
                            setPosition(e.target.value);
                        }}
                    />
                    <div className="mu-asw-timings">
                        <small>{formatDuration(position)}</small>
                        <small>-{formatDuration(duration - position)}</small>
                    </div>
                    <div className="mu-asw-actions">
                        <button
                            className="mu-asw-prev"
                            onClick={() => {
                                props.prev(-1)
                            }}
                        >
                            <NextIcon color="var(--mu-asw-text-theme)" />
                        </button>
                        <button
                            className="mu-asw-playpause"
                            onClick={() => {
                                paused ? songref.current.play() : songref.current.pause()
                            }}
                        >
                            {paused ? (
                                <PlayIcon color="var(--mu-asw-text-theme)" />
                            ) : (
                                <PauseIcon color="var(--mu-asw-text-theme)" />
                            )}
                        </button>
                        <button
                            className="mu-asw-next"
                            onClick={() => {
                                props.next(-1)
                            }}
                        >
                            <NextIcon color="var(--mu-asw-text-theme)" />
                        </button>
                    </div>
                    <div className="mu-asw-volumecontrol">
                        <SoundLowIcon color="var(--mu-asw-text-theme)" />
                        <input
                            type="range"
                            value={songVolume}
                            min={0}
                            max={100}
                            className="mu-asw-volumeinput"
                            onChange={(e: any) => {
                                songref.current.volume = e.target.value / 100;
                                setSongVolume(e.target.value);
                            }}
                        />
                        <SoundHighIcon color="var(--mu-asw-text-theme)" style={{ marginRight: "10px" }} />
                        <button>
                            {
                                repeat == "repeatall" ?
                                    <RepeatAll color="var(--mu-asw-text-theme)" onClick={() => { setRepeat("norepeat") }} /> :
                                    repeat == "repeat" ?
                                        <RepeatOne color="var(--mu-asw-text-theme)" onClick={() => { setRepeat("repeatall") }} /> :
                                        <NoRepeat color="var(--mu-asw-text-theme)" onClick={() => { setRepeat("repeat") }} />
                            }
                        </button>
                    </div>
                    <audio
                        loop={repeat == "repeat" ? true : false}
                        ref={songref}
                        src={props.song?.song?.trim()}
                        onLoadedMetadata={onLoadedMetadata}
                        onTimeUpdate={onTimeUpdate}
                        onEnded={onEnded}
                        onPlay={() => { setPaused(false) }}
                        onPause={() => { setPaused(true) }}
                    />
                </div>
            </div>
        </div>
    );
})
export default SingleSong;