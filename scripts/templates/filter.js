// Importation des modules nécessaires
import MediaTemplate from '../Media/MediaTemplate.js';
import Ligthbox from './lightbox.js';

// Classe représentant un filtre déroulant pour trier le portfolio de médias
export default class DropdownFilter {
	/**
	 * Constructeur de la classe DropdownFilter.
	 * @param {Array<ImageModel | VideoModel>} portfolio - Liste des médias du portfolio.
	 * @param {PhotographerModel} photographer - Le photographe associé au portfolio.
	 * @param {"popularity" | "date" | "title"} sort - Critère initial de tri du portfolio.
	 */
	constructor(portfolio, photographer, sort = 'popularity') {
		this.sortPortfolio = portfolio;
		this.photographer = photographer;
		this.value = sort;
		this.render();
		this.sortMedia();
		this.renderPortfolio();
	}

	// Affiche le portfolio trié et initialise la Lightbox
	renderPortfolio() {
		new MediaTemplate(this.sortPortfolio, this.photographer).createPortfolio();
		Ligthbox.init(this.sortPortfolio);
	}

	/**
	 * Gère l'événement de changement de valeur dans le filtre déroulant.
	 * @param {Event} e - L'événement de changement de valeur.
	 */
	handleChange(e) {
		this.value = e.target.value;
		this.sortMedia();
		this.renderPortfolio();
	}

	// Trie le portfolio en fonction de la valeur actuelle du filtre
	sortMedia() {
		switch (this.value) {
			case 'popularity':
				return this.sortPortfolio.sort((a, b) => b.likes - a.likes);

			case 'date':
				return this.sortPortfolio.sort((a, b) => new Date(b.date) - new Date(a.date));

			case 'title':
				return this.sortPortfolio.sort((a, b) => {
					if (b.title > a.title) return -1;
					if (a.title > b.title) return 1;
					return 0;
				});

			default:
				return this.portfolio;
		}
	}

	// Affiche le filtre déroulant dans le document
	render() {
		const template = document.getElementById('template-filter');
		const dropdown = document.importNode(template.content, true);
		const select = dropdown.querySelector('.filter-section__select');

		// Initialise la valeur du filtre déroulant et ajoute un écouteur d'événements 'change'
		select.value = this.value;
		select.addEventListener('change', (e) => this.handleChange(e));

		// Ajoute le filtre déroulant à l'élément avec l'ID 'filter' dans le document
		document.getElementById('filter').appendChild(dropdown);
	}
}
