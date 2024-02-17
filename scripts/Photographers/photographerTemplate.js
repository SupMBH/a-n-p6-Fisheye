// Classe représentant un modèle de présentation pour un photographe
export default class PhotographerTemplate {
	/**
	 * Constructeur de la classe PhotographerTemplate.
	 * @param {Object} data - Les données du photographe.
	 */
	constructor(data) {
	  this.photographer = data;
	}
  
	/**
	 * Crée une carte de présentation du photographe.
	 * @returns {Node} - Le nœud de l'élément de carte du photographe.
	 */
	createPhotographerCard() {
	  // Récupère le modèle de carte du photographe depuis le document
	  const templateCard = document.getElementById('photographer-card');
	  // Clone le contenu du modèle
	  const card = document.importNode(templateCard.content, true);
  
	  // Récupère les éléments de la carte à mettre à jour
	  const link = card.querySelector('a');
	  const img = card.querySelector('img');
  
	  // Met à jour les attributs du lien et de l'image
	  link.setAttribute('href', `photographer.html?id=${this.photographer.id}`);
	  link.setAttribute('aria-label', `Voir le profil de ${this.photographer.name}`);
	  img.setAttribute('src', this.photographer.portrait);
	  img.setAttribute('alt', `Photo de profil de ${this.photographer.name}`);
  
	  // Met à jour les informations textuelles
	  card.querySelector('.photographer-card__name').textContent = this.photographer.name;
	  card.querySelector(
		'.photographer-card__location',
	  ).textContent = `${this.photographer.city}, ${this.photographer.country}`;
	  card.querySelector('.photographer-card__tagline').textContent = this.photographer.tagline;
	  card.querySelector('.photographer-card__price').textContent = `${this.photographer.price}€/jour`;
  
	  return card;
	}
  
	/**
	 * Crée l'en-tête de présentation du photographe.
	 * @returns {Node} - Le nœud de l'en-tête de profil du photographe.
	 */
	createPhotographerHeader() {
	  // Récupère le modèle d'en-tête de profil du photographe depuis le document
	  const templateCard = document.getElementById('template-photographer-profile');
	  // Clone le contenu du modèle
	  const card = document.importNode(templateCard.content, true);
  
	  // Ajoute l'attribut 'data-hidden' à l'élément de l'en-tête pour le masquer
	  card.querySelector('.photographer-header').setAttribute('data-hidden', '');
	  // Récupère l'élément de l'image à mettre à jour
	  const img = card.querySelector('img');
  
	  // Met à jour les attributs de l'image
	  img.setAttribute('src', this.photographer.portrait);
	  img.setAttribute('alt', `Photo de profil de ${this.photographer.name}`);
  
	  // Met à jour les informations textuelles
	  card.querySelector('.photographer-card__name').textContent = this.photographer.name;
	  card.querySelector(
		'.photographer-card__location',
	  ).textContent = `${this.photographer.city}, ${this.photographer.country}`;
	  card.querySelector('.photographer-card__tagline').textContent = this.photographer.tagline;
  
	  return card;
	}
  }  