// Classe représentant le modèle de données d'un média
export default class Media {
	// Propriétés privées de la classe
	#id;
	#photographerId;
	#title;
	#likes;
	#price;
	#date;
	#liked;
  
	/**
	 * Constructeur de la classe Media.
	 * @param {Object} data - Les données du média.
	 */
	constructor(data) {
	  // Initialise les propriétés privées avec les données du média
	  this.#id = data.id;
	  this.#photographerId = data.photographerId;
	  this.#title = data.title;
	  this.#likes = data.likes;
	  this.#price = data.price;
	  this.#date = data.date;
	  // Initialise la propriété liked à false par défaut
	  this.#liked = false;
	}
  
	// Méthodes getters pour accéder aux propriétés privées
  
	/**
	 * Getter pour l'identifiant du média.
	 * @returns {number} - L'identifiant du média.
	 */
	get id() {
	  return this.#id;
	}
  
	/**
	 * Getter pour l'identifiant du photographe associé au média.
	 * @returns {number} - L'identifiant du photographe.
	 */
	get photographerId() {
	  return this.#photographerId;
	}
  
	/**
	 * Getter pour le titre du média.
	 * @returns {string} - Le titre du média.
	 */
	get title() {
	  return this.#title;
	}
  
	/**
	 * Getter pour la date du média.
	 * @returns {string} - La date du média.
	 */
	get date() {
	  return this.#date;
	}
  
	/**
	 * Getter pour le prix du média.
	 * @returns {number} - Le prix du média.
	 */
	get price() {
	  return this.#price;
	}
  
	/**
	 * Getter pour le nombre de "likes" du média.
	 * @returns {number} - Le nombre de "likes" du média.
	 */
	get likes() {
	  return this.#likes;
	}
  
	/**
	 * Getter pour l'état de "like" du média.
	 * @returns {boolean} - L'état de "like" du média (true/false).
	 */
	get liked() {
	  return this.#liked;
	}
  
	// Méthodes setters pour mettre à jour les propriétés privées
  
	/**
	 * Setter pour mettre à jour le nombre de "likes" du média.
	 * @param {number} likes - Le nouveau nombre de "likes".
	 */
	set setLikes(likes) {
	  this.#likes = likes;
	}
  
	/**
	 * Setter pour mettre à jour l'état de "like" du média.
	 * @param {boolean} value - La nouvelle valeur de l'état de "like" (true/false).
	 */
	set setLiked(value) {
	  this.#liked = value;
	}
  }
  