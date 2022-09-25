import { useEffect, useState } from 'react';
import { Loader, NextIcon, Sortasc, Sortdesc } from './svgicons';

function SongListComponent(props: any) {
    const [songs, setSongs]: any = useState([]);
    const [selection, setSelection]: any = useState({
        sort: -1,
    });
    const [pagination, setPagination]: any = useState({
        countperpage: 10,
        currentpage: 0,
    });
    useEffect(() => {
        let firstrecord = pagination.countperpage * pagination.currentpage;
        let lastrecord = firstrecord + 10;
        let obj = props.songsList.slice(firstrecord, lastrecord)
        setSongs(obj);
    }, [props])
    const nextpage = () => {
        if (pagination.currentpage !== Math.floor(props.songsList.length / pagination.countperpage)) {
            let firstrecord = pagination.countperpage * (pagination.currentpage + 1);
            let lastrecord = (props.songsList.length < (firstrecord + 10)) ? props.songsList.length : (firstrecord + 10);
            let obj = props.songsList.slice(firstrecord, lastrecord)
            setSongs(obj);
            setPagination({
                ...pagination,
                currentpage: pagination.currentpage + 1
            })
        }
    }
    const prevpage = () => {
        if (pagination.currentpage !== 0) {
            let firstrecord = pagination.countperpage * (pagination.currentpage - 1);
            let lastrecord = firstrecord + 10;
            let obj = props.songsList.slice(firstrecord, lastrecord)
            setSongs(obj);
            setPagination({
                ...pagination,
                currentpage: pagination.currentpage - 1
            })
        }
    }
    return (
        <div className={props.page == "album" ? 'mu-asw-songslist mu-asw-albumsongs' : 'mu-asw-songslist'}>
            <div className={props.page == "album" ? "mu-asw-filter mu-asw-albumfilter" : "mu-asw-filter"}>
                {
                    props.page == "album" ?
                        <div
                            className="mu-asw-back"
                            onClick={() => {
                                props.onBack();
                            }}
                        >
                            <NextIcon color="var(--mu-asw-text-theme)" />
                        </div> :
                        <></>
                }
                <input
                    type="search"
                    placeholder="filter songs"
                    onChange={(e) => {
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
            <div className="mu-asw-songlisttop">
                {
                    songs?.map((song: any, i: number) =>
                        <div
                            className='mu-asw-list'
                            key={"song" + i}
                            onClick={() => {
                                props.next({ index: i, song })
                            }}
                        >
                            <img
                                alt="can't win - Chilling Sunday"
                                src={song?.thmbnail ? song?.thmbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRRLllmkEeMbYJ2JV6nj-DvUq8WGaAVhbdYPOFqg_7Nsw3UIdzF6sVZtgtZE46eoSsEw&usqp=CAU"}
                            />
                            <div style={{ marginLeft: 1.5, minWidth: 0 }}>
                                <div className="mu-asw-load">
                                    <div className="mu-asw-name">
                                        <p className='mu-asw-album'>{song.album}</p>
                                        <p className='mu-asw-songname'>{song.songname}</p>
                                    </div>
                                    <div className="mu-asw-loader">
                                        {
                                            JSON.stringify(song) == JSON.stringify(props.currentSong) ?
                                                <Loader color="var(--mu-asw-text-theme)" /> : <></>
                                        }
                                    </div>
                                </div>
                                <p className='mu-asw-description'>{song.shortdesc}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="mu-asw-pagination">
                <div className="count">
                    {pagination.countperpage * pagination.currentpage + 1}
                    <span style={{ padding: "0px 5px" }}>-</span>
                    {
                        (props.songsList.length < (pagination.countperpage * pagination.currentpage) + 10) ?
                            props.songsList.length :
                            (pagination.countperpage * pagination.currentpage) + 10
                    }
                    <span style={{ padding: "0px 10px" }}>of</span>
                    {props.songsList.length}
                </div>
                <div className="button">
                    <button className='prev' onClick={() => { prevpage() }}>
                        <NextIcon color="var(--mu-asw-text-theme)" />
                    </button>
                    <button className='next' onClick={() => { nextpage() }}>
                        <NextIcon color="var(--mu-asw-text-theme)" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SongListComponent;