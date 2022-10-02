import * as React from 'react';
import SingleSong from './singlesong';
import SongListComponent from './songlist';
import Album from './album';

function Player(props: any) {
    const [currentSong, setCurrentSong]: any = React.useState(props.songsList[0]);
    const [currentIndex, setCurrentIndex]: any = React.useState(0);
    const [isPlaying, setIsPlaying]: any = React.useState(false);
    const [view, setView]: any = React.useState({
        album: {
            status: false,
            view: "web"
        },
        songlist: {
            status: false,
            view: "web"
        },
    });
    const singlesong: any = React.useRef();
    const [defaultView, setDefaultView]: any = React.useState({
        songsListView: true,
        albumView: true
    })

    const next = (index: number, data: any) => {
        if (index != -1) {
            setCurrentIndex(data.id);
            setCurrentSong(props.songsList[data.id])
        }
        else {
            let ind = (currentIndex == props.songsList.length - 1) ? 0 : (currentIndex + 1);
            setCurrentIndex(ind);
            setCurrentSong(props.songsList[ind])
        }
    }

    const prev = () => {
        let ind = (currentIndex == 0) ? (currentIndex.length - 1) : (currentIndex - 1);
        setCurrentIndex(ind);
        setCurrentSong(props.songsList[currentIndex - 1])
    }

    React.useEffect(() => {
        if (props.bgColor) {
            document.documentElement.style.setProperty('--mu-asw-bg-theme', props.bgColor);
        }
        if (props.textColor) {
            document.documentElement.style.setProperty('--mu-asw-text-theme', props.textColor);
        }
        if (window.innerWidth <= 767) {
            setView({
                ...view,
                songlist: {
                    status: false,
                    view: "mobile"
                },
                album: {
                    status: false,
                    view: "mobile"
                }
            })
        }
        else {
            if (window.innerWidth <= 1020) {
                setView({
                    ...view,
                    album: {
                        status: false,
                        view: "mobile"
                    }
                })
            }
        }
    }, [])

    return (
        <div
            className='mu-asw-top'
        >
            {
                (props?.songsListView) ?
                    <SongListComponent
                        songsList={props.songsList}
                        next={
                            (e: any) => {
                                next(e.index, e.song)
                            }
                        }
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        view={view.songlist}
                        onView={() => {
                            setView({
                                ...view,
                                songlist: {
                                    ...view.songlist,
                                    status: !view.songlist.status
                                }
                            })
                        }}
                        onResize={(e: any) => {
                            setView({
                                ...view,
                                songlist: e
                            })
                        }}
                    /> :
                    <></>
            }
            <SingleSong
                ref={singlesong}
                song={currentSong}
                playing={(e: boolean) => {
                    setIsPlaying(e)
                }}
                next={(index: number) => {
                    next(index, {});
                }}
                prev={() => {
                    prev();
                }}
                onView={(panel: string) => {
                    setView({
                        ...view,
                        [panel]: {
                            ...view[panel],
                            status: !view[panel].status
                        }
                    })
                }}

            />
            {
                props.albumView ?
                    <Album
                        songsList={props.songsList}
                        next={
                            (e: any) => {
                                next(e.index, e.song)
                            }
                        }
                        view={view.album}
                        isPlaying={isPlaying}
                        currentSong={currentSong}
                        onView={() => {
                            setView({
                                ...view,
                                album: {
                                    ...view.album,
                                    status: !view.album.status
                                }
                            })
                        }}
                        onResize={(e: any) => {
                            setView({
                                ...view,
                                album: e
                            })
                        }}
                    /> :
                    <></>
            }
        </div>
    );
}

export default Player;