// Importe la classe PhotographerTemplate pour la création de modèles de présentation de photographe
import PhotographerTemplate from './photographerTemplate.js';

// Classe représentant une usine pour créer des présentations de photographe
export default class PhotographerFactory {
  /**
   * Crée une présentation de photographe en fonction du type spécifié.
   * @param {Object} data - Les données du photographe.
   * @param {string} type - Le type de présentation à créer ('card' ou 'header').
   * @returns {Node | Error} - Le nœud de l'élément de présentation créé ou une erreur en cas de type inconnu.
   */
  static createPhotographer(data, type) {
    // Vérifie le type spécifié pour décider du type de présentation à créer
    if (type === 'card') {
      // Crée une carte de présentation du photographe
      return new PhotographerTemplate(data).createPhotographerCard();
    }
    if (type === 'header') {
      // Crée un en-tête de présentation du photographe
      return new PhotographerTemplate(data).createPhotographerHeader();
    }

    // Retourne une erreur si le type spécifié est inconnu
    return new Error('Type inconnu');
  }
}