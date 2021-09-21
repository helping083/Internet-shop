# DevcomInternetShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Installation
  - Make sure you have installed `angular cli`.
  - Run the command `npm install` in order to install all the dependencies and then:
  - Run `ng-serve` command for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Document Structure
      
    app
    ├── _cart
    ├── _product-catalog
        ├─ components
        ├─ enums
        ├─ pages
        └── other files
    ├── _shared
    ├── components
    ├── enums
    ├── interfaces
    ├── services
    └── other files

The “app” folder contains the following:
- folders with `_` prefix. Those folders are modules and contain componens, enums, pages and routing for those modules
- _shared module is the global module for global dependencies, shared across all other modules
- components folder contains dumb components shared across all modules
- enums contains global enums
- interfaces folder contains app level abastractions
- services folder is self-explanatory

### Style Guide
- variables and functions with `_` prefix are private.
- variables with `$` suffix mean a stream, something like observable or subject
- tabwith - 2
- angular material indigo-pink theme

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
