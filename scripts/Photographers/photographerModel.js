/**
 * @typedef {{id: number; name: string; tagline: string; country: string; city: string;
* price: number; portrait: string;}} Profile
*/

/**
* @typedef {{ id: number; photographerId: number; title: string; image: string;
* likes: number; price: number; date: string; }[]} Portfolio
*/

// Classe représentant le modèle d'un photographe
export default class PhotographerModel {
 #profile; // Données du profil du photographe
 #portfolio; // Liste des médias du portfolio du photographe

 /**
  * Constructeur de la classe PhotographerModel.
  * @param {{ profile: Profile, portfolio: Portfolio }} param0 - Les données du profil et du portfolio du photographe.
  */
 constructor({ profile, portfolio = [] }) {
   this.#profile = profile;
   this.#portfolio = portfolio;
 }

 // Méthodes d'accès aux propriétés du profil du photographe

 get id() {
   return this.#profile.id;
 }

 get name() {
   return this.#profile.name;
 }

 get tagline() {
   return this.#profile.tagline;
 }

 get country() {
   return this.#profile.country;
 }

 get city() {
   return this.#profile.city;
 }

 get price() {
   return this.#profile.price;
 }

 get portrait() {
   return `assets/photographers/${this.#profile.portrait}`;
 }

 // Méthodes d'accès et de modification du portfolio du photographe

 get portfolio() {
   return this.#portfolio;
 }

 /**
  * Modifie le portfolio du photographe.
  * @param {Portfolio} portfolio - La nouvelle liste des médias du portfolio.
  */
 set setPortfolio(portfolio) {
   this.#portfolio = portfolio;
 }
}