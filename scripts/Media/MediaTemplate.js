// Importe la classe ImageModel pour la gestion des modèles d'images
import ImageModel from './models/image.js';

// Classe représentant le modèle de présentation des médias
export default class MediaTemplate {
  /**
   * Constructeur de la classe MediaTemplate.
   * @param {Array} portfolio - La liste des médias du portfolio.
   * @param {Object} photographer - Les informations du photographe.
   */
  constructor(portfolio, photographer) {
    this.portfolio = portfolio;
    this.photographer = photographer;
  }

  /**
   * Ajoute ou supprime un "like" pour un média donné.
   * @param {Event} e - L'événement déclenché lorsqu'un bouton "like" est cliqué.
   */
  addLike(e) {
    // Récupère l'identifiant du média depuis l'attribut "data-id" du bouton
    const mediaId = Number(e.target.dataset.id);
    // Recherche le média correspondant dans le portfolio
    const media = this.portfolio.find((m) => m.id === mediaId);
    // Récupère le bouton, le paragraphe et l'icône du bouton
    const btn = document.querySelector(`button[data-id="${mediaId}"]`);
    const p = btn.previousElementSibling;
    const imgIcon = btn.querySelector('img');

    // Modifie les propriétés du média en fonction de son état actuel
    if (!media.liked) {
      media.setLikes = media.likes + 1;
      media.setLiked = true;
      imgIcon.setAttribute('src', 'assets/icons/heart-solid.svg');
    } else {
      media.setLikes = media.likes - 1;
      media.setLiked = false;
      imgIcon.setAttribute('src', 'assets/icons/heart-regular.svg');
    }

    // Met à jour le nombre de "likes" affiché
    p.textContent = media.likes;
    // Met à jour le total des "likes" pour le portfolio
    this.updateTotalLikes();
  }

  /**
   * Met à jour le nombre total de "likes" affiché.
   */
  updateTotalLikes() {
    const totalLikes = this.portfolio.reduce((acc, curr) => acc + curr.likes, 0);
    const p = document.querySelector('.infos-likes__number');
    p.textContent = totalLikes;
  }

  /**
   * Crée une carte affichant le nombre total de "likes" et le tarif du photographe.
   */
  createCardTotalLikes() {
    const totalLikes = this.portfolio.reduce((acc, curr) => acc + curr.likes, 0);
    const template = document.getElementById('template-infos');
    const info = document.importNode(template.content, true);

    info.querySelector('.infos-likes__number').textContent = totalLikes;
    info.querySelector('.infos-price').textContent = `${this.photographer.price}€/jour`;

    const section = document.getElementById('portfolio');
    section.append(info);
  }

  /**
   * Crée une carte pour un média donné.
   * @param {Object} data - Les informations du média.
   * @returns {Node} - Le nœud de la carte du média créé.
   */
  createMediaCard(data) {
    const template = document.getElementById('template-media');
    const card = document.importNode(template.content, true);

    const article = card.querySelector('.media-card');
    article.setAttribute('data-id', data.id);

    const thumbnail = card.querySelector('.media-thumbnail');
    thumbnail.dataset.icon = data instanceof ImageModel ? '\uf03e' : '\uf04b';

    const link = card.querySelector('.media-thumbnail__link');
    link.setAttribute('href', data.path);
    link.setAttribute('aria-label', `Agrandir l'image ${data.title}`);
    link.setAttribute('title', `Agrandir l'image ${data.title}`);
    link.append(data.createHTML());

    const btn = card.querySelector('.media-likes__like');
    btn.addEventListener('click', (e) => this.addLike(e));
    btn.setAttribute('data-id', data.id);

    const img = card.querySelector('.media-likes__heart');
    if (data.liked) {
      img.setAttribute('src', 'assets/icons/heart-solid.svg');
    }

    card.querySelector('.media-detail__title').textContent = data.title;
    card.querySelector('.media-likes__number').textContent = data.likes;

    return card;
  }

  /**
   * Crée la présentation complète du portfolio avec toutes les cartes de médias.
   */
  createPortfolio() {
    // Crée une liste de cartes pour chaque média dans le portfolio
    const list = this.portfolio.map((media) => this.createMediaCard(media));
    // Récupère la section du portfolio dans le document
    const section = document.getElementById('portfolio');
    // Supprime le contenu existant de la section
    section.innerHTML = '';
    // Ajoute toutes les cartes de médias à la section
    section.append(...list);

    // Crée la carte affichant le nombre total de "likes" et le tarif du photographe
    this.createCardTotalLikes();
  }
}
