// Importe la classe de modèle de base Media
import Media from '../MediaModel.js';

/**
 * @typedef {{ id: number; photographerId: number; title: string; image: string;
 * likes: number; date: Date; price: number }} DataImage
 */

// Classe représentant le modèle de média spécifique pour les images, héritant de la classe de modèle de base Media
export default class ImageModel extends Media {
	// Propriétés privées de la classe
	#imagePath;
	#type;

	/**
	 * Constructeur de la classe ImageModel.
	 * @param {DataImage} data - Les données spécifiques à l'image.
	 */
	constructor(data) {
		// Appelle le constructeur de la classe parente avec les données communes aux médias
		super(data);
		// Initialise la propriété privée #imagePath avec le chemin de l'image spécifique
		this.#imagePath = data.image;
		// Initialise la propriété privée #type avec la valeur 'image' pour indiquer le type de média
		this.#type = 'image';
	}

	/**
	 * Getter pour obtenir le chemin complet de l'image.
	 * @returns {string} - Le chemin complet de l'image.
	 */
	get path() {
		return `assets/portfolio/${super.photographerId}/${this.#imagePath}`;
	}

	/**
	 * Getter pour obtenir le type de média (image).
	 * @returns {string} - Le type de média (image).
	 */
	get type() {
		return this.#type;
	}

	/**
	 * Méthode pour créer un élément HTML représentant l'image.
	 * @returns {HTMLImageElement} - L'élément img représentant l'image.
	 */
	createHTML() {
		// Crée un élément img et configure ses attributs avec les données de l'instance
		const img = document.createElement('img');
		img.src = this.path;
		img.alt = ` ${this.title}`;
		img.classList.add('media-thumbnail__image');
		// Retourne l'élément img créé
		return img;
	}
}