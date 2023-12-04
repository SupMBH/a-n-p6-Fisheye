// Classe représentant une modal pour le formulaire de contact
export default class FormModal {
	#photographerName;
  
	/**
	 * Constructeur de la classe FormModal.
	 * @param {string} photographerName - Le nom du photographe associé au formulaire.
	 * @param {HTMLButtonElement} btn - Le bouton qui ouvre la modal.
	 */
	constructor(photographerName, btn) {
	  this.#photographerName = photographerName;
	  this.element = null;
	  this.btn = btn;
	  this.render();
	  this.initEvent();
	}
  
	// Initialise les écouteurs d'événements
	initEvent() {
	  // Ajoute un écouteur d'événement au bouton pour ouvrir la modal
	  this.btn.addEventListener('click', () => this.open());
  
	  // Ajoute un écouteur d'événement pour fermer la modal avec la touche ESC
	  window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
		  this.close();
		}
	  });
	}
  
	// Ouvre la modal et met à jour les attributs aria
	open() {
	  this.element.style.setProperty('display', 'block');
	  this.element.setAttribute('aria-modal', true);
	  this.btn.setAttribute('aria-expanded', true);
  
	  // Masque les éléments spécifiés par l'attribut 'data-hidden' en ajoutant 'aria-hidden'
	  const elHide = document.querySelectorAll('[data-hidden]');
	  elHide.forEach((el) => el.setAttribute('aria-hidden', true));
	}
  
	// Ferme la modal et rétablit les attributs aria
	close() {
	  this.element.style.setProperty('display', 'none');
	  this.element.setAttribute('aria-modal', false);
	  this.btn.setAttribute('aria-expanded', false);
  
	  // Rétablit l'accessibilité en supprimant l'attribut 'aria-hidden'
	  const elHide = document.querySelectorAll('[data-hidden]');
	  elHide.forEach((el) => el.removeAttribute('aria-hidden'));
	}
  
	/**
	 * Gère l'événement de soumission du formulaire.
	 * @param {SubmitEvent} e - L'événement de soumission du formulaire.
	 */
	submit(e) {
	  e.preventDefault();
  
	  // Récupère le formulaire et ses données
	  const form = e.target;
	  const formData = new FormData(form);
  
	  // Affiche les entrées du formulaire dans la console (à personnaliser selon les besoins)
	  [...formData.entries()].forEach((entry) => console.log(entry));
  
	  // Réinitialise le formulaire et ferme la modal
	  form.reset();
	  this.close();
	}
  
	// Affiche la modal dans le document
	render() {
	  // Récupère le modèle de la modal depuis le document
	  const template = document.getElementById('template-formModal');
	  // Clone le contenu du modèle
	  const modal = document.importNode(template.content, true);
	  
	  // Met à jour le titre de la modal avec le nom du photographe
	  modal.querySelector('h2').innerHTML = `Contactez-moi <br> ${this.#photographerName}`;
  
	  // Ajoute des écouteurs d'événements aux boutons de fermeture et de soumission du formulaire
	  modal.querySelector('.modal__close').addEventListener('click', () => this.close());
	  modal.querySelector('form').addEventListener('submit', (e) => this.submit(e));
  
	  // Crée un élément overlay pour la modal
	  const overlay = document.createElement('div');
	  overlay.classList.add('modal-overlay');
	  overlay.setAttribute('role', 'dialog');
	  overlay.setAttribute('aria-modal', false);
	  overlay.setAttribute('aria-labelledby', 'open-form');
	  overlay.append(modal);
	  // Ajoute l'overlay à l'élément avec l'ID 'profile' dans le document
	  document.getElementById('profile').append(overlay);
  
	  // Initialise l'élément de la classe avec l'élément overlay
	  this.element = document.querySelector('.modal-overlay');
	}
  }
  