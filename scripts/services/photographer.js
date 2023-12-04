// Importe la classe de base API pour la gestion des requêtes
import API from './api.js';

// Classe étendant la classe de base API pour la gestion des données des photographes
export default class PhotographerAPI extends API {
  /**
   * Récupère la liste de tous les photographes.
   * @returns {Promise<Array<Object>>} - Une promesse résolue avec la liste des photographes.
   * @throws {Error} - Une erreur si la requête n'est pas réussie.
   */
  async getAllPhotographers() {
    try {
      // Utilise la méthode fetch de la classe parente pour récupérer les données
      const { photographers } = await super.fetch();
      return photographers;
    } catch (error) {
      console.error(error);
      // Lance une nouvelle erreur avec un message personnalisé en cas d'échec de la requête
      throw new Error(`Erreur ${error.status}, aucun photographe trouvé`);
    }
  }

  /**
   * Récupère les informations d'un photographe spécifique par son identifiant.
   * @param {number} userId - L'identifiant du photographe à récupérer.
   * @returns {Promise<Object>} - Une promesse résolue avec les informations du photographe.
   * @throws {Error} - Une erreur si la requête n'est pas réussie ou si le photographe n'est pas trouvé.
   */
  async getPhotographerById(userId) {
    try {
      // Utilise la méthode fetch de la classe parente pour récupérer les données
      const { photographers } = await super.fetch();
      // Filtrage pour obtenir le photographe avec l'identifiant spécifié
      const photographer = photographers.filter((user) => user.id === userId)[0];

      // Redirige vers la page d'accueil si le photographe n'est pas trouvé
      if (!photographer) {
        window.location.href = 'index.html';
      }

      return photographer;
    } catch (error) {
      console.error(error);
      // Lance une nouvelle erreur avec un message personnalisé en cas d'échec de la requête
      throw new Error(`Erreur ${error.status}, le profil du photographe n'est pas disponible`);
    }
  }
}