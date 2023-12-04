// Importe la classe de modèle de base Media
import Media from '../MediaModel.js';

/**
 * @typedef {{ id: number; photographerId: number; title: string;
 * video: string; likes: number; date: Date; price: number }} DataVideo
 */

// Classe représentant le modèle de média spécifique pour les vidéos, héritant de la classe de modèle de base Media
export default class VideoModel extends Media {
	// Propriétés privées de la classe
	#videoPath;
	#type;

	/**
	 * Constructeur de la classe VideoModel.
	 * @param {DataVideo} data - Les données spécifiques à la vidéo.
	 */
	constructor(data) {
		// Appelle le constructeur de la classe parente avec les données communes aux médias
		super(data);
		// Initialise la propriété privée #videoPath avec le chemin de la vidéo spécifique
		this.#videoPath = data.video;
		// Initialise la propriété privée #type avec la valeur 'video' pour indiquer le type de média
		this.#type = 'video';
	}

	/**
	 * Getter pour obtenir le chemin complet de la vidéo.
	 * @returns {string} - Le chemin complet de la vidéo.
	 */
	get path() {
		return `assets/portfolio/${super.photographerId}/${this.#videoPath}`;
	}

	/**
	 * Getter pour obtenir le type de média (vidéo).
	 * @returns {string} - Le type de média (vidéo).
	 */
	get type() {
		return this.#type;
	}

	/**
	 * Méthode pour créer un élément HTML représentant la vidéo.
	 * @returns {HTMLVideoElement} - L'élément vidéo représentant la vidéo.
	 */
	createHTML() {
		// Crée un élément vidéo et configure son attribut src avec le chemin de la vidéo
		const video = document.createElement('video');
		video.src = this.path;
		video.classList.add('media-thumbnail__video');
		// Retourne l'élément vidéo créé
		return video;
	}
}