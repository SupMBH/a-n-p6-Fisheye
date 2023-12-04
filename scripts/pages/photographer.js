// Importe la classe PhotographerAPI pour la récupération des données d'un photographe depuis le service
import PhotographerAPI from '../services/photographer.js';
// Importe la classe PortfolioAPI pour la récupération des données du portfolio depuis le service
import PortfolioAPI from '../services/portfolio.js';
// Importe la classe PhotographerModel pour la gestion des données du photographe
import PhotographerModel from '../Photographers/photographerModel.js';
// Importe la classe PhotographerFactory pour la création de présentations de photographe
import PhotographerFactory from '../Photographers/photographerFactory.js';
// Importe la classe FormModal pour la création et la gestion d'une fenêtre modale de formulaire
import FormModal from '../templates/modalForm.js';
// Importe la classe DropdownFilter pour la création et la gestion d'un filtre déroulant
import DropdownFilter from '../templates/filter.js';
// Importe la classe MediaFactory pour la création de modèles de médias
import MediaFactory from '../Media/MediaFactory.js';

// Fonction asynchrone pour initialiser la page du photographe
async function init() {
  // Récupère les paramètres d'URL pour obtenir l'identifiant du photographe
  const url = new URLSearchParams(window.location.search);
  const userId = Number(url.get('id'));
  let medias = [];

  try {
    // Récupère les données du photographe en utilisant la classe PhotographerAPI
    const photographer = await new PhotographerAPI().getPhotographerById(userId);
    // Récupère les données du portfolio du photographe en utilisant la classe PortfolioAPI
    const portfolio = await new PortfolioAPI().getPortfolioPhotographer(userId);

    // Crée une instance de PhotographerModel avec les données du photographe et du portfolio
    const photographerModel = new PhotographerModel({ profile: photographer, portfolio });
    // Crée un en-tête de présentation du photographe en utilisant la classe PhotographerFactory
    const header = PhotographerFactory.createPhotographer(photographerModel, 'header');
    // Ajoute l'en-tête à la section du profil dans le document
    document.getElementById('profile').appendChild(header);

    // Récupère le bouton d'ouverture de la fenêtre modale dans le document
    const btnOpenModal = document.querySelector('button');
    // Crée une instance de FormModal avec le nom du photographe et le bouton d'ouverture
    new FormModal(photographer.name, btnOpenModal);

    // Parcourt le portfolio et crée une instance de MediaModel pour chaque média
    portfolio.forEach((media) => {
      const mediaModel = MediaFactory.createMedia(media);
      medias.push(mediaModel);
    });

    // Crée une instance de DropdownFilter pour la gestion du tri des médias
    const mediaSort = new DropdownFilter(medias, photographerModel, 'popularity');
    // Trie les médias en fonction du filtre de popularité
    medias = mediaSort.sortPortfolio;
  } catch (error) {
    // Affiche une erreur dans la console en cas de problème lors de la récupération des données
    console.error(error);
  }
}

// Appelle la fonction init pour démarrer l'initialisation de la page du photographe
init();
