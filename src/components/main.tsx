import * as React from 'react';
import SingleSong from './singlesong';
import SongListComponent from './songlist';
import Album from './album';

function Player(props: any) {
    const [currentSong, setCurrentSong]: any = React.useState(props.songsList[0]);
    const [currentIndex, setCurrentIndex]: any = React.useState(0);
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
                    /> :
                    <></>
            }
            <SingleSong
                ref={singlesong}
                song={currentSong}
                next={(index: number) => {
                    next(index, {});
                }}
                prev={() => {
                    prev();
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
                        currentSong={currentSong}
                    /> :
                    <></>
            }
        </div>
    );
}

export default Player;