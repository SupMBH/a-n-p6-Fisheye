// Importe la classe de base API pour la gestion des requêtes
import API from './api.js';

// Classe étendant la classe de base API pour la gestion des données du portfolio
export default class PortfolioAPI extends API {
  /**
   * Récupère le portfolio d'un photographe spécifique par son identifiant.
   * @param {number} userId - L'identifiant du photographe pour lequel récupérer le portfolio.
   * @returns {Promise<Array<Object>>} - Une promesse résolue avec la liste des médias du portfolio.
   * @throws {Error} - Une erreur si la requête n'est pas réussie ou si le portfolio n'est pas disponible.
   */
  async getPortfolioPhotographer(userId) {
    try {
      // Utilise la méthode fetch de la classe parente pour récupérer les données
      const { media } = await super.fetch();
      // Filtrage pour obtenir le portfolio du photographe avec l'identifiant spécifié
      const portfolio = media.filter((user) => user.photographerId === userId);

      return portfolio;
    } catch (error) {
      console.error(error);
      // Lance une nouvelle erreur avec un message personnalisé en cas d'échec de la requête
      throw new Error(`Erreur ${error.status}, le portfolio du photographe n'est pas disponible`);
    }
  }
}