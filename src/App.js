import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import PicCard from "./components/PicCard";
import { useDispatch, useSelector } from "react-redux";
import { setPicturesData } from "./feature/picturesSlice";

const App = () => {
  // useSelector permet de faire appel aux données dans le store pour l'utiliser dans l'application
  // state est en paramètre, une fois dans le state la data de pictures.pictures est récupéré
  const picsData = useSelector((state) => state.pictures.pictures);
	// useDispatch remplace setPicsData puisque nous utilisons redux :
	// const [picsData, setPicsData] = useState([]);
  // useDispatch déclenche l'action, la logique du reducer
	const dispatch = useDispatch();
	// use Effect = au lancement du composant, axios ira récupérer la data
	useEffect(() => {
		axios
			.get('http://localhost:5000/pictures')
			.then((res) => dispatch(setPicturesData(res.data)));
	}, []);

	return (
		<>
			<h1>NFT Gallery</h1>
			<Form />
			<div className="cards-container">
				{picsData?.map((pic, index) => (
					<PicCard key={index} pic={pic} />
				))}
			</div>
		</>
	);
};

export default App;
