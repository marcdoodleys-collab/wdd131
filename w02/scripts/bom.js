// Références DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Événement du bouton
button.addEventListener('click', function () {

    // Vérifie si le champ n'est pas vide
    if (input.value.trim() !== '') {

        // Création des éléments
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        // Ajouter le texte du chapitre
        li.textContent = input.value;

        // Bouton supprimer
        deleteButton.textContent = '❌';

        // Accessibilité
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);

        // Ajouter le bouton dans le li
        li.append(deleteButton);

        // Ajouter le li dans la liste
        list.append(li);

        // Effacer le champ input
        input.value = '';

        // Remettre le curseur dans l'input
        input.focus();

        // Supprimer un élément
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });
    }
});