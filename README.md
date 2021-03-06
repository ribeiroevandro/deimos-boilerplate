# Deimos Boilerplate

This project uses Pug, Stylus, Gulp and Browsersync.

Maybe you want to read about them:
- [GulpJS](http://gulpjs.com/)
- [Pug](https://github.com/pugjs/pug)
- [Stylus](http://learnboost.github.io/stylus/)
- [Browsersync](https://www.browsersync.io/)

For grid system uses [Lost](https://github.com/peterramsing/lost) with some help from [Rucksack](http://simplaio.github.io/rucksack/) for animations, reset and a lot of great mixins, [Rupture](https://github.com/jenius/rupture) for responsive utilities. And [Font Magician](https://github.com/jonathantneal/postcss-font-magician/) to get the webfonts.


## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
- [GulpJS](http://gulpjs.com/)


```sh
# Clone this repository
$ git clone git@github.com:ribeiroevandro/deimos-boilerplate.git
$ cd deimos-boilerplate

# install gulp globally
$ npm install -g gulp

# install dependencies
$ npm install

```

With the commands above, you have everything to start.

### Folders and Files

```sh
├── README.md
├── build
│   ├── assets
│   │   └── css
│   │   │   └── style.css
│   │   ├── img/
│   │   ├── svg/
│   │   └── js
│   │       └── main.js
│   ├── styleguide
│   ├── index.html
├── gulpfile.js
├── package.json
└── src
    ├── data/
    ├── helpers/
    ├── img/
    ├── js/
    │   └── main.js
    ├── styl
    │   ├── _core/*.styl
    │   ├── blocks/*.styl
    │   ├── elements/*.styl
    │   ├── imports/*.styl
    │   ├── templates/*.styl
    │   └── style.styl
    └── pug
        └── layouts
        │   ├── inc
        │   │   ├── head.pug
        │   │   ├── header.pug
        │   │   ├── footer.pug
        │   │   └── scripts.pug
        │   └── default.pug
        └── index.pug
```

Those folders and file will change during the project.


### Code Standards

This project uses my own [Coding Style](https://github.com/LFeh/coding-style) as code reference.

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

To help you, this project has a `npm run fix` command to fix all jscs errors.


#### Parker CSS

To view a reporter of CSS files, use a `npm run reporter` command.


### Tasks

- `gulp`: run all tasks and initialize watch for changes and a server
- `gulp js`: execute js files
- `gulp html`: compile pug files
- `gulp css`: compile stylus files
- `gulp images`: compress image files
- `gulp icons`: generate sprite of icons
- `gulp browser-sync`: inicialize a server
- `gulp watch`: call for watch files
- `gulp build`: run all tasks
- `gulp surge`: deploy for surge.sh CDN

### Surge

For configure the surge.sh in `gulpfile.js` change the line `domain: 'example.surge.sh'` for your domain.



## Credits

This boilerplate uses as a base the awesome [Kratos Boilerplate](https://github.com/LFeh/kratos-boilerplate) by [@LFeh](https://twitter.com/LFeh) :heart:


## License

[MIT License](https://ribeiroevandro.mit-license.org/) © Evandro Ribeiro
