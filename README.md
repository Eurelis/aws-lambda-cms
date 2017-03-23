# AWS CMS LAMBDA POC

Etude de conception d'un CMS basé sur AWS Lambda Node.JS


### Ressources NPM
- Serverless pour déployer les fonctions lambda, les tables dynamo, les roles, les routes, etc ...
- handlebars pour les templates
- serverless-client-s3 pour les déployer les templates sur S3
- cookie pour créer les cookies
- hat pour générer des tokens

### Concept
- Un point d'entré qui dispatch en fonction de la route (via un fichier routing.js) :
  - \+ Permettrais d'encapsuler la fonction d'entrée avec la session
  - \- Les routes ne sont pas gérés par API Gateway
- Plusieurs points d'entrés définit via Serverless :
  - \+ Utilisation d'API Gateway
  - \- Comment encapsuler la session ?
