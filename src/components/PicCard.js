import { useRef, useState } from "react";
import axios from "axios";
import Delete from "./Delete";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editPicture } from "../feature/picturesSlice";

const PicCard = ({ pic }) => {
  const [edit, setEdit] = useState(false);
  const artistInput = useRef();
  const dispatch = useDispatch();

  const handleEdit = () => {
		setEdit(false);

		// La donnée est récupérée depuis l'input avec artistInput et stocké dans data
		// data est seulement utilisé pour json.server il faut inscrire toute la donnée pour pas qu'elle ne soit supprimé
		const data = {
			artist: artistInput.current.value,
			// Seul le nom de l'artiste peut être 'edit', les autres valeurs ne changent donc pas
			year: pic.year,
			photo: pic.photo,
		};

		axios.put('http://localhost:5000/pictures/' + pic.id, data).then(() => {
			// dispatch est utilisé pour récupérer la data et l'envoyer au slice redux 'editPicture' corespondant à l'id avec comme paramètre data
			dispatch(editPicture([data.artist, pic.id]));
		});
	};

  return (
    <div className="pic-card">
      <img src={pic.photo} alt={"photo de " + pic.artist} />
      <div className="infos">
        <div className="title">
          {edit ? (
            <div>
              <input
                defaultValue={pic.artist}
                ref={artistInput}
                autoFocus
              ></input>
              <button onClick={() => handleEdit()}>Valider</button>
            </div>
          ) : (
            <h4>
              {artistInput.current ? artistInput.current.value : pic.artist}
            </h4>
          )}
          <p>{pic.year}</p>
        </div>
        <div className="btn-container">
          <div className="edit-icon" onClick={() => setEdit(!edit)}>
            <FaRegEdit />
          </div>
          <Delete id={pic.id} />
        </div>
      </div>
    </div>
  );
};

export default PicCard;
