# Africagram API

Bienvenue sur le dépôt GitHub de l’API Africagram. Africagram est une application de partage de photos conçue par et pour les Africains. Elle offre une plateforme où les utilisateurs peuvent partager leurs moments précieux, suivre d’autres utilisateurs, aimer et commenter les publications.

## Fonctionnalités

- Téléchargement d’images : Les utilisateurs peuvent télécharger des images dans différents formats et tailles.
- Aimer et commenter : Les utilisateurs peuvent exprimer leur appréciation et partager leurs pensées sur les publications.
- Abonnements : Les utilisateurs peuvent suivre d’autres utilisateurs pour rester à jour avec leurs publications.
- Fil d’actualité : Les utilisateurs peuvent voir les dernières publications de ceux qu’ils suivent, triées par date de publication.
- Authentification : Chaque utilisateur doit s’authentifier pour accéder à son compte.
- Analytiques : L’application fournit des statistiques telles que le nombre total d’utilisateurs, le nombre d’utilisateurs par pays, le nombre moyen de publications par utilisateur, et la répartition par sexe.

## Exigences techniques

- Formats d’images supportés : JPEG, PNG et GIF.
- Taille maximale de l’image : 5 Mo.
- Limite de téléchargement : Un utilisateur peut télécharger jusqu’à 10 images par jour.
- Authentification et autorisation : Basées sur les jetons JWT.
- Logs : Possibilité de visualiser les logs des différentes modifications effectuées.

## Schéma de la base de données
- Utilisateur : #id, id_profile, firstname, lastname, email, password, date_creation, date_modification
- Profile : #id, id_utilisateur, sexe, pays, ville, date_creation, date_modification
- Post : #id, utilisateur_id, caption, date_creation, date_modification
- Aime : #id, utilisateur_id, post_id, date_creation
- Commentaire : #id, utilisateur_id, post_id, message, date_creation
- Follower : #id, following_id, follower_id, date_creation

## Endpoints de l’API
- `/register` Inscription d’un nouvel utilisateur
- `/update-profile` Modification des données d’un utilisateur existant
- `/login` Connexion d’un utilisateur existant
- `/logout` Déconnexion d’un utilisateur authentifié
- `/user-posts` Récupération des publications de l’utilisateur authentifié
- `/news-feed` Récupération du fil d’actualité des publications les plus récentes
- `/create-post` Création d’une nouvelle publication
- `/add-comment` Écriture d’un commentaire sur une publication
- `/app-stats` Récupération des statistiques de l’application
- `/like-post` Liker une publication
- `/follow-user` Suivre un utilisateur

## Technologies Utilisées
- Node.js
- Express.js 