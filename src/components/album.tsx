import { useEffect, useState } from 'react';
import { GroupBy } from './common';
import SongListComponent from './songlist';
import { Loader, Sortasc, Sortdesc } from './svgicons';

function Album(props: any) {
    const [songs, setSongs]: any = useState(props.songsList);
    const [groups, setGroups]: any = useState({
        view: "album",
        group: {},
        currentList: []
    });
    const [selection, setSelection]: any = useState({
        sort: -1,
    });
    useEffect(() => {
        setSongs(props.songsList)
        let group = GroupBy(props.songsList, "album")
        setGroups({
            ...groups,
            group,
        })
    }, [props])
    return (
        <div className='mu-asw-albumlist'>
            {
                groups.view == "album" ?
                    <>
                        <div className="filter">
                            <input
                                type="search"
                                placeholder="filter album"
                                onChange={(e: any) => {
                                    let a = JSON.parse(JSON.stringify(props.songsList));
                                    let b = a.filter((name: any) => { return name.songname.includes(e.target.value) })
                                    setSongs(b);
                                }}
                            />
                            <div
                                className={selection.sort == 0 ? "sortasc active" : "sortasc"}
                                onClick={() => {
                                    let a = JSON.parse(JSON.stringify(props.songsList));
                                    let b = a.sort((c: any, d: any) => {
                                        let x = c.songname.toLowerCase();
                                        let y = d.songname.toLowerCase();
                                        if (x < y) { return -1; }
                                        if (x > y) { return 1; }
                                        return 0;
                                    })
                                    setSongs(b);
                                    setSelection({
                                        sort: 0
                                    })
                                }}
                            >
                                <Sortdesc color={selection.sort == 0 ? "var(--mu-asw-bg-theme)" : "var(--mu-asw-text-theme)"} />
                            </div>
                            <div
                                className={selection.sort == 1 ? "sortdesc active" : "sortdesc"}
                                onClick={() => {
                                    let a = JSON.parse(JSON.stringify(props.songsList));
                                    let b = a.sort((c: any, d: any) => {
                                        let x = c.songname.toLowerCase();
                                        let y = d.songname.toLowerCase();
                                        if (x < y) { return 1; }
                                        if (x > y) { return -1; }
                                        return 0;
                                    })
                                    setSongs(b);
                                    setSelection({
                                        sort: 1
                                    })
                                }}
                            >
                                <Sortasc color={selection.sort == 1 ? "var(--mu-asw-bg-theme)" : "var(--mu-asw-text-theme)"} />
                            </div>
                        </div>
                        <div className="mu-asw-albumlisttop">
                            {
                                Object.keys(groups?.group)?.map((album: any, i: number) =>
                                    <div
                                        className="mu-asw-album"
                                        key={"album" + i}
                                        onClick={() => {
                                            setGroups({
                                                ...groups,
                                                currentList: groups.group[album],
                                                view: "song"
                                            })
                                        }}
                                    >
                                        <img
                                            src={groups?.group[album][0]?.thmbnail ? groups?.group[album][0]?.thmbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRRLllmkEeMbYJ2JV6nj-DvUq8WGaAVhbdYPOFqg_7Nsw3UIdzF6sVZtgtZE46eoSsEw&usqp=CAU"}
                                            alt=""
                                        />
                                        <p className="name">{album}</p>
                                    </div>
                                )
                            }
                        </div>
                    </> :
                    <SongListComponent
                        page="album"
                        songsList={groups.currentList}
                        next={
                            (e: number) => { props.next(e) }
                        }
                        currentSong={props.currentSong}
                        onBack={() => {
                            setGroups({
                                ...groups,
                                view: "album"
                            })
                        }}
                    />
            }
        </div>
    );
}

export default Album;