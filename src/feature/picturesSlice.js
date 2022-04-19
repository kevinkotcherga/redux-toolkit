import { createSlice } from "@reduxjs/toolkit";

// createSlice fusionne l'action et le reducer
export const picturesSlice = createSlice({
  // 1) UN NOM
  name: 'pictures',
  // 2) STATE DE BASE
  initialState: {
    // Le state de base est nul, il sera ensuite incrémenté avec la base de données
    pictures: null,
  },
  // 3) REDUCERS
  reducers: {
    // GET
    setPicturesData: (state, action) => {
      // Quand l'action est appelée, le state est récupéré (la data, au début de base nul)
      // action.payload sont les données que l'on récupère en paramètre
      state.pictures = action.payload;
    },
    // CREATE
    addPicture: (state, action) => {
			// push ajoute l'action que l'on récupère en paramètre au state
			state.pictures.push(action.payload);
		},
    // EDIT
    editPicture: (state, action) => {
      // Un map analyse chaque élement de la data du state
      state.pictures = state.pictures.map((pictureData) => {
				// action.payload[1] est égal à l'id (dans PicCard.js)
				if (pictureData.id === action.payload[1]) {
					return {
            // ... renvoit la data
						...pictureData,
						// La posibilité d'edit n'est que sur le nom de l'artiste
						// action.payload[0] est égal à data.artist (dans PicCard.js)
						artist: action.payload[0],
					};
				} else {
					return pictureData;
				}
			});
    },
    // DELETE
    deletePicture: (state, action) => {
      // Le state est filtré, chaque élement qui n'est pas égal à l'id envoyé est gardé
      state.pictures = state.pictures.filter((pictureData) => pictureData.id !== action.payload);
    },
  },
});

// 4) EXPORT
// Les reducers sont exportés pour être utilisé dans les composants
export const { setPicturesData, addPicture, editPicture, deletePicture } =
	picturesSlice.actions;
// pisctureSlice
export default picturesSlice.reducer;
