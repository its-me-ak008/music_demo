import { group } from 'console';
import { useEffect, useState } from 'react';
import { GroupBy } from './common';
import SongListComponent from './songlist';
import { Loader, NextIcon, Sortasc, Sortdesc } from './svgicons';

function Album(props: any) {
    const [songs, setSongs]: any = useState(props.songsList);
    const [view, setView]: any = useState("web");
    const [groups, setGroups]: any = useState({
        view: "album",
        group: {},
        currentList: [],
        tempgroup: {},
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
            tempgroup: group
        })
        window.addEventListener('resize', (): void => {
            if (window.innerWidth <= 1020) {
                setView('mobile')
                // props.onResize({
                //     status: props.view.status,
                //     view: "mobile"
                // })
            } else {
                setView('web')
                // props.onResize({
                //     status: props.view.status,
                //     view: "web"
                // })
            }
        })
        setView(props.view.view)
    }, [props])
    return (
        <div className={view == 'web' ? 'mu-asw-albumlist' : props.view.status ? 'mu-asw-albumlist mobile active' : 'mu-asw-albumlist mobile'}>
            {
                groups.view == "album" ?
                    <>
                        <div className={props.view.status ? "mu-asw-filter mu-asw-filterback" : "mu-asw-filter"}>
                            {
                                props.view.status ?
                                    <div
                                        className="mu-asw-back"
                                        onClick={() => {
                                            props.onView();
                                        }}
                                    >
                                        <NextIcon color="var(--mu-asw-text-theme)" />
                                    </div> :
                                    <></>
                            }
                            <input
                                type="search"
                                placeholder="filter album"
                                onChange={(e: any) => {
                                    let a = JSON.parse(JSON.stringify(groups.tempgroup));
                                    let b = Object.keys(a).filter((name: any) => {
                                        return name.toLowerCase().includes(e.target.value.toLowerCase())
                                    }).reduce((name: any, key: any) =>
                                        (name[key] = a[key], name), {}
                                    )
                                    setGroups({
                                        ...groups,
                                        group: b
                                    });
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
                        isPlaying={props.isPlaying}
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