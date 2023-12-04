// Importe les classes de modèle ImageModel et VideoModel
import ImageModel from './models/image.js';
import VideoModel from './models/video.js';

// Classe représentant une fabrique de médias pour créer des instances de modèles de médias
export default class MediaFactory {
	/**
	 * Méthode statique pour créer une instance de modèle de média en fonction des données fournies.
	 * @param {Object} data - Les données du média à partir desquelles créer le modèle.
	 * @returns {ImageModel|VideoModel|Error} - L'instance du modèle de média créée.
	 */
	static createMedia(data) {
		// Vérifie si les données contiennent une propriété "image"
		if (data.image) {
			// Crée une instance de modèle ImageModel avec les données fournies
			return new ImageModel(data);
		}
		// Vérifie si les données contiennent une propriété "video"
		if (data.video) {
			// Crée une instance de modèle VideoModel avec les données fournies
			return new VideoModel(data);
		}

		// Si aucune correspondance n'est trouvée, renvoie une erreur indiquant que seules les images et les vidéos sont prises en charge
		return new Error('Seules les images et les vidéos sont prises en charge');
	}
}