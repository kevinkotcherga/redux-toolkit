import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addPicture } from "../feature/picturesSlice";

const Form = () => {
  const inputArtist = useRef();
  const inputYear = useRef();
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
		// empêche un rechargement/rafraîchissement du navigateur
		e.preventDefault();

		// la donnée est récupérée depuis le formulaire avec inputArtist et inputYear et stocké dans data
    // data est seulement utilisé pour json.server il faut inscrire toute la donnée pour pas qu'elle ne soit supprimé
		const data = {
			artist: inputArtist.current.value,
			year: inputYear.current.value,
			photo: `https://picsum.photos/400/${Math.round(
				Math.random() * 200 + 300,
			)}`,
		};

    // post est utilisé pour envoyer de la data à la base de donné, ici le tableau data est envoyé dans pictures
		axios.post('http://localhost:5000/pictures', data).then(() => {
      // dispatch est utilisé pour récupérer la data et l'envoyer au slice redux 'addPicture' avec comme paramètre data
      dispatch(addPicture(data));
			// reset remet le formulaire à 0
			formRef.current.reset();
		});
	};

  return (
		<div className="form-container">
			<div className="form">
				<h3>Enregistrer une nouvelle photo</h3>
				<form onSubmit={e => handleSubmit(e)} ref={formRef}>
					<input type="text" placeholder="Artiste" ref={inputArtist} />
					<input type="text" placeholder="Année" ref={inputYear} />
					<input type="submit" value="Envoyer" />
				</form>
			</div>
		</div>
	);
};

export default Form;
