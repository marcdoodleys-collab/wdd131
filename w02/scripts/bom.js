// Sélection des éléments du DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Événement du bouton Ajouter
button.addEventListener('click', function () {

    // Vérifie que le champ n'est pas vide
    if (input.value.trim() !== '') {

        // Création des éléments
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        // Ajout du texte
        li.textContent = input.value;

        // Texte du bouton supprimer
        deleteButton.textContent = '❌';

        // Accessibilité
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Ajouter le bouton dans le li
        li.append(deleteButton);

        // Ajouter le li dans la liste
        list.append(li);

        // Événement supprimer
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Nettoyer le champ texte
        input.value = '';

        // Remettre le curseur dans le champ
        input.focus();

    } else {

        // Si vide → remettre le focus
        input.focus();
    }
});