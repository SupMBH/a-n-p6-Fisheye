
// Importation des modèles d'image et de vidéo
import ImageModel from '../Media/models/image.js';
import VideoModel from '../Media/models/video.js';

// Classe représentant une Lightbox pour afficher les médias
export default class Lightbox {
  /**
   * Initialise la Lightbox en ajoutant des écouteurs d'événements aux miniatures de médias.
   * @param {Array<ImageModel | VideoModel>} listMedia - Liste des médias à afficher dans la Lightbox.
   */
  static init(listMedia) {
    // Sélectionne toutes les balises <a> avec la classe 'media-thumbnail__link'
    const links = document.querySelectorAll('.media-thumbnail__link');

    // Pour chaque balise <a>, ajoute un écouteur d'événements 'click'
    links.forEach((media) => {
      media.addEventListener('click', (e) => {
        e.preventDefault();
        // Récupère l'élément parent de l'élément parent de la miniature (élément article)
        const article = e.target.parentElement.parentElement;
        // Récupère l'ID du média à partir de l'attribut 'data-id' de l'article
        const mediaID = Number(article.dataset.id);
        // Trouve le média correspondant dans la liste des médias
        const targetMedia = listMedia.find((m) => m.id === mediaID);
        // Crée une nouvelle instance de Lightbox avec le média cible et la liste des médias
        new Lightbox(targetMedia, listMedia);
      });
    });
  }

  /**
   * Constructeur de la classe Lightbox.
   * @param {ImageModel | VideoModel} currentMedia - Le média actuellement affiché.
   * @param {Array<ImageModel, VideoModel>} listMedia - Liste complète des médias à afficher.
   */
  constructor(currentMedia, listMedia) {
    // Initialise les propriétés de la classe
    this.currentMedia = currentMedia;
    this.listMedia = listMedia;
    this.lightboxElement = this.render(currentMedia);
    this.loadMedia(currentMedia);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // Ajoute l'élément de la Lightbox au corps du document
    document.body.append(this.lightboxElement);
    // Ajoute un écouteur d'événements 'keyup' pour gérer les touches du clavier
    document.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Gère l'événement de touche du clavier (échap, gauche, droite).
   * @param {MouseEvent | KeyboardEvent} e - L'événement de touche du clavier.
   */
  handleKeyUp(e) {
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'ArrowLeft') {
      this.prev();
    } else if (e.key === 'ArrowRight') {
      this.next();
    }
  }

  // Ferme la Lightbox en supprimant l'élément HTML après une animation de disparition
  close() {
    this.lightboxElement.classList.add('fadeOut');
    setTimeout(() => this.lightboxElement.remove(), 300);
    document.removeEventListener('keyup', this.handleKeyUp);

    // Rétablit l'accessibilité en supprimant l'attribut 'aria-hidden'
    const elHide = document.querySelectorAll('[data-hidden]');
    elHide.forEach((e) => e.removeAttribute('aria-hidden'));
  }

  // Affiche le média suivant dans la liste
  next() {
    let indexCurrentMedia = this.listMedia.findIndex((media) => media.id === this.currentMedia.id);
    if (indexCurrentMedia === this.listMedia.length - 1) {
      indexCurrentMedia = -1;
    }
    this.currentMedia = this.listMedia[indexCurrentMedia + 1];
    this.loadMedia();
  }

  // Affiche le média précédent dans la liste
  prev() {
    let indexCurrentMedia = this.listMedia.findIndex((media) => media.id === this.currentMedia.id);
    if (indexCurrentMedia === 0) {
      indexCurrentMedia = this.listMedia.length;
    }
    this.currentMedia = this.listMedia[indexCurrentMedia - 1];
    this.loadMedia();
  }

  // Charge le média actuel (image ou vidéo) dans la Lightbox
  loadMedia() {
    if (this.currentMedia.type === 'image') {
      this.loadImage();
    } else if (this.currentMedia.type === 'video') {
      this.loadVideo();
    } else {
      console.error('Format non pris en charge');
    }
  }

  // Charge une image dans la Lightbox
  loadImage() {
    const img = new Image();
    img.src = this.currentMedia.path;
    img.alt = this.currentMedia.title;
    img.classList.add('lightbox-content__media', 'fadeIn');

    const container = this.lightboxElement.querySelector('.lightbox-content');
    const loader = document.createElement('div');
    loader.classList.add('lightbox-content__loader');
    container.innerHTML = '';
    container.appendChild(loader);

    const title = this.createTitle();

    img.onload = () => {
      container.removeChild(loader);
      container.appendChild(img);
      container.appendChild(title);
    };
  }

  // Charge une vidéo dans la Lightbox
  loadVideo() {
    const video = document.createElement('video');
    video.classList.add('lightbox-content__media', 'fadeIn');
    video.src = this.currentMedia.path;
    video.autoplay = true;
    video.controls = true;

    const container = this.lightboxElement.querySelector('.lightbox-content');
    container.innerHTML = '';

    const title = this.createTitle();

    container.appendChild(video);
    container.appendChild(title);
  }

  // Crée et retourne un élément de titre pour le média actuel
  createTitle() {
    const title = document.createElement('h3');
    title.classList.add('lightbox-content__title');
    title.textContent = this.currentMedia.title;

    return title;
  }

  /**
   * Rend la Lightbox en clonant le contenu du modèle HTML et en ajoutant des écouteurs d'événements.
   * @returns {HTMLElement} - L'élément HTML de la Lightbox.
   */
  render() {
    // Récupère le modèle de la Lightbox depuis le document
    const template = document.getElementById('template-lightbox');
    // Clone le contenu du modèle
    const lightbox = document.importNode(template.content, true);

    // Ajoute des écouteurs d'événements aux boutons de la Lightbox
    lightbox.querySelector('.lightbox__close').addEventListener('click', () => this.close());
    lightbox.querySelector('.lightbox__next').addEventListener('click', () => this.next());
    lightbox.querySelector('.lightbox__prev').addEventListener('click', () => this.prev());

    // Ajoute la Lightbox au corps du document
    document.body.append(lightbox);

    // Masque les éléments spécifiés par l'attribut 'data-hidden' en ajoutant 'aria-hidden'
    const elHide = document.querySelectorAll('[data-hidden]');
    elHide.forEach((e) => e.setAttribute('aria-hidden', true));

    // Met le focus sur le bouton de fermeture de la Lightbox
    document.querySelector('.lightbox__close').focus();

    // Retourne l'élément HTML de la Lightbox
    return document.querySelector('.lightbox');
  }
}
