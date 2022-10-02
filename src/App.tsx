import './App.scss';
import * as React from 'react';
import SingleSong from './components/singlesong';
import SongListComponent from './components/songlist';
import { songsList } from './songs';
import Album from './components/album';
import Player from './components/main';

function App() {
	return (
		<Player
			songsList={songsList}
			bgColor={"#11b26a"}
			textColor={"black"}
			songsListView={true}
			albumView={true}
		/>
	);
}

export default App;