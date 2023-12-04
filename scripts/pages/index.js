// Importe la classe PhotographerAPI pour la récupération des données des photographes depuis le service
import PhotographerAPI from '../services/photographer.js';
// Importe la classe PhotographerFactory pour la création de présentations de photographe
import PhotographerFactory from '../Photographers/photographerFactory.js';
// Importe la classe PhotographerModel pour la gestion des données du photographe
import PhotographerModel from '../Photographers/photographerModel.js';

// Fonction asynchrone pour initialiser la section des photographes
async function init() {
  try {
    // Récupère la liste des photographes en utilisant la classe PhotographerAPI
    const photographers = await new PhotographerAPI().getAllPhotographers();

    // Récupère l'élément de la section des photographes dans le document
    const photographersSection = document.querySelector('section.photographer_section');

    // Parcourt la liste des photographes et crée une carte de présentation pour chaque photographe
    photographers.forEach((photographer) => {
      // Crée une instance de PhotographerModel avec les données du photographe
      const photographerModel = new PhotographerModel({ profile: photographer });
      // Crée une carte de présentation du photographe en utilisant la classe PhotographerFactory
      const card = PhotographerFactory.createPhotographer(photographerModel, 'card');
      // Ajoute la carte à la section des photographes dans le document
      photographersSection.appendChild(card);
    });
  } catch (error) {
    // Affiche une erreur dans la console en cas de problème lors de la récupération des données
    console.error(error);
  }
}

// Appelle la fonction init pour démarrer l'initialisation de la section des photographes
init();