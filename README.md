# Catálogo de Soluciones Digitales
Catálogo web que permite a empresas de tecnología de Nuevo León registrar sus servicios, para que clientes potenciales puedan consultarlos.

## Table of contents

* [Client Details](#client-details)
* [Environment URLS](#environment-urls)
* [Da Team](#team)
* [Technology Stack](#technology-stack)
* [Management resources](#management-resources)
* [Setup the project](#setup-the-project)
* [Running the stack for development](#running-the-stack-for-development)
* [Stop the project](#stop-the-project)
* [Restoring the database](#restoring-the-database)
* [Debugging](#debugging)
* [Running specs](#running-specs)
* [Checking code for potential issues](#checking-code-for-potential-issues)


### Client Details

| Name           | Email                       | Role              |
| -------------- | --------------------------- | ----------------- |
| Ángeles Vela   | angeles.vela@csoftmty.org   | Directora general | 
| Mariel Román   | mariel.roman@csoftmty.org   |                   |
| Sonia Tijerina | sonia.tijerina@csoftmty.org |                   |


### Project URL

**Production** - [TBD](TBD)

### The team

| Name              | Email                     | Role        |
| ----------------- | ------------------------- | ----------- |
| Mariel Román      | mariel.roman@csoftmty.org | Product owner |
| David Souza       | A00818141@itesm.mx        | Administrador del proyecto y configuración, developer |
| Mauricio Guadiana | A01281897@itesm.mx        | Proxy product owner, developer |
| Enrique Villa     | A01193635@itesm.mx        | Scrum master, developer |

### Technology Stack
| Technology    |
| ------------- |
| React         |
| Firebase (Firestore, Auth, Hosting, Storage, Functions) |

### Management tools

You should ask for access to this tools if you don't have it already:

* [Github repo](https://github.com/ProyectoIntegrador2018/catalogo-soluciones)
* [Backlog](https://trello.com/b/lFvmyLPa/cat%C3%A1logo-de-soluciones-digitales)
* [Documentation](https://github.com/ProyectoIntegrador2018/catalogo-soluciones/blob/master/README.md)

## Development

The following instructions are for a Linux (Ubuntu) environment.

### Setup the project

Install the node version manager with the following command:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Install the node version 12.18.4:
```
nvm install 12.18.4
```
```
nvm use 12.18.4
```

Install the Firebase CLI:
```
npm install -g firebase-tools
```

Clone the GitHub repository:
```
git clone https://github.com/ProyectoIntegrador2018/catalogo-soluciones.git
```

Install the project dependencies:

*First cd into the project directory*
```
npm install
```

Login into Firebase (you must have been invited to the project to work on it): 
```
Firebase login
```

### Running the stack for Development

First build the frontend with the command:
```
npm run build
```

Then run the Firebase emulators with the command:
```
firebase emulators:start
```

This will set up the following emulators:
* Hosting emulator for the frontend.
* Functions emulator for the backend.
* Database emulator.
* A UI to view logs, and database contents.

### Deploying project

To deploy the project run the following command:
```
firebase deploy
```