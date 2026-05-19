// ================================
// Sélection des éléments du DOM
// ================================
 
// Partie liste
const input      = document.querySelector('#favchap');
const addButton  = document.querySelector('#addButton');
const list       = document.querySelector('#list');
 
// Partie menu hamburger
const hamButton  = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
 
 
// ================================
// Événement du bouton Ajouter
// ================================
 
addButton.addEventListener('click', function () {
 
    // Vérifie que le champ n'est pas vide
    if (input.value.trim() !== '') {
 
        // Création des éléments
        const li           = document.createElement('li');
        const deleteButton = document.createElement('button');
 
        // Ajout du texte dans le li
        li.textContent = input.value;
 
        // Texte du bouton supprimer
        deleteButton.textContent = '❌';
 
        // Accessibilité
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
 
        // Ajouter le bouton dans le li
        li.append(deleteButton);
 
        // Ajouter le li dans la liste
        list.append(li);
 
        // ================================
        // Événement supprimer
        // ================================
 
        deleteButton.addEventListener('click', function () {
 
            // Supprime le li
            list.removeChild(li);
 
            // Remet le focus dans le champ
            input.focus();
        });
 
        // Nettoyer le champ texte
        input.value = '';
 
        // Remettre le curseur dans le champ
        input.focus();
 
    } else {
 
        // Si le champ est vide, remettre le focus
        input.focus();
    }
});
 
 
// ================================
// Menu Hamburger
// ================================
 
hamButton.addEventListener('click', () => {
 
    // Ouvre / Ferme le menu
    navigation.classList.toggle('open');
 
    // Anime le bouton hamburger
    hamButton.classList.toggle('open');
});
 
