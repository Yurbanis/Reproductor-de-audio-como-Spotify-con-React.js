import { number } from "prop-types";
import React, { useState, useRef, useEffect } from "react";

import "../../styles/index.css"


//create your first component
const Home = () => {

	const [playlists, setPlaylists] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [songs, setSongs] = useState(false);
	const [number, setNumber] = useState(0);

	const playRef = useRef();

	const setPreview = play => {
		if (songs) {
			setSongs(false)
			playRef.current.src = `https://assets.breatheco.de/apis/sound/${play.url}.pausa()`
		} else {
			setSongs(true)
			playRef.current.src = `https://assets.breatheco.de/apis/sound/${play.url}`;
		}
	}

	const setPreview2 = () => {
		if (songs) {
			setSongs(false)
			playRef.current.src = `https://assets.breatheco.de/apis/sound/${playlists[number].url}.pausa()`
		} else {
			setSongs(true)
			playRef.current.src = `https://assets.breatheco.de/apis/sound/${playlists[number].url}`;
		}
	}

	const next = () => {
		setNumber(number + 1)
		playRef.current.src = `https://assets.breatheco.de/apis/sound/${playlists[number].url}`;
	}

	const back = () => {
		setNumber(number - 1)
		playRef.current.src = `https://assets.breatheco.de/apis/sound/${playlists[number].url}`;
	}

	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/sound/songs')
			.then((res) => res.json())
			.then((playlist) => setPlaylists(playlist))
			.catch((err) => console.log(err))
			.finally(() => setLoaded(true));
	}, []);
	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<div className="col-md-5 mt-5">
					<table className="table table-hover table-dark">
						<tbody data-bs-spy="scroll" className="scrollspy-example">
							{
								playlists.map((plays) => {
									return (
										<tr key={plays.id} onClick={() => setPreview(plays)}>
											<th scope="row">{plays.id}</th>
											<td >{plays.name}</td>
										</tr>
									)
								})
							}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan={2}>
									<div className="w-50 mx-auto d-flex justify-content-around">
										<button onClick={() => back()}><i className="fa-solid fa fa-caret-left fa-2x"></i></button>
										<button onClick={() => setPreview2()}>
											<i className={`${songs ? "fa-solid fa fa-pause" : "fa-sharp fa-solid fa fa-play"}`}></i>
										</button>
										<button onClick={() => next()}><i class="fa-solid fa fa-caret-right fa-2x"></i></button>
									</div>
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			<audio ref={playRef} autoplay="autoplay" ></audio>
		</div>
	);
};

export default Home;
