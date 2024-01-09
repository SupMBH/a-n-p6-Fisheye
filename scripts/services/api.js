// Classe représentant une API pour récupérer les données des photographes.
// Elle encapsule la logique pour effectuer une requête fetch vers une API (le fichier JSON dans ce cas) et gérer les réponses. 
// Elle fournit une abstraction pour récupérer les données des photographes de manière asynchrone.

export default class API {
	/**
	 * Constructeur de la classe API.
	 */
	constructor() {
	  // URL du fichier JSON contenant les données des photographes
	  this.url = 'data/photographers.json';
	}
  
	/**
	 * Fonction asynchrone pour effectuer une requête fetch et récupérer les données.
	 * @returns {Promise<Object>} - Une promesse résolue avec les données récupérées.
	 * @throws {Error} - Une erreur si la requête n'est pas réussie.
	 */
	async fetch() {
	  // Effectue une requête fetch vers l'URL spécifiée
	  const res = await fetch(this.url);
  
	  // Vérifie si la réponse est OK, sinon lance une erreur avec le statut de la réponse
	  if (!res.ok) {
		throw new Error(res.status);
	  }
  
	  // Parse les données de la réponse en format JSON et les retourne
	  const data = await res.json();
	  return data;
	}
  }