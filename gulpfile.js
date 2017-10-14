'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');
const prefixer = require('autoprefixer');
const fontMagician = require('postcss-font-magician');
const gcmq = require('gulp-group-css-media-queries');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const lost = require('lost');
const rupture = require('rupture');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const data = require('gulp-data');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const mdcss = require('mdcss');
const fs = require('fs');
const del = require('del');
const surge = require('gulp-surge');
const nib = require('nib');


const srcApp = {
  js: [
    'src/js/**/*.js'
  ],
  css: 'src/styl/**/*.styl',
  styl: 'src/styl/style.styl',
  html: 'src/pug/*.pug',
  icons: 'src/icons/*',
  svg: 'src/svg/**/*',
  img: 'src/img/**/*',
  data: 'src/data/',
  helpers: 'src/helpers/'
};

const buildApp = {
  build: 'build/**/*',
  js: 'build/assets/js/',
  css: 'build/assets/css/',
  html: 'build/',
  img: 'build/assets/img',
  svg: 'build/assets/svg',
  icons: 'build/assets/icons'
};

let dataJson = {};
let files = [];

gulp.task('clean', () => {
  return del(buildApp.build);
});

gulp.task('css', () => {
  return gulp.src(srcApp.styl)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        nib(),
        rupture(),
        poststylus([
          lost(),
          fontMagician(),
          rucksack(),
          prefixer()
        ])
      ],
      compress: false
    }))
    .pipe(gcmq())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildApp.css));
});

gulp.task('styleguide', () => {
  return gulp.src(srcApp.styl)
    .pipe(plumber())
    .pipe(stylus({
      use: [
        rupture(),
        poststylus([
          lost(),
          fontMagician(),
          rucksack({
            autoprefixer: true
          })
        ])
      ],
      compress: false
    }))
    .pipe(postcss([
      mdcss({
        title: 'Deimos Boilerplate Styleguide',
        destination: 'build/styleguide',
        examples: {
          css: ['../assets/css/style.css']
        },
      })
    ]));
});

gulp.task('js', () => {
  return gulp.src(srcApp.js)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildApp.js));
});

gulp.task('read:data', () => {
  const dataAdapter = require('./' + srcApp.helpers + 'dataAdapter');
  fs.readdir(srcApp.data, (err, items) => {
    files = items.map(item => item.split('.')[0]);
    items.forEach((file, index) => dataJson[files[index]] = dataAdapter(srcApp.data + file));
  });
});

gulp.task('html', () => {
  return gulp.src(srcApp.html)
    .pipe(plumber())
    .pipe(data(dataJson))
    .pipe(pug())
    .pipe(gulp.dest(buildApp.html));
});

gulp.task('images', () => {
  return gulp.src(srcApp.img)
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(buildApp.img));
});

gulp.task('svg', () => {
  gulp.src(srcApp.svg)
    .pipe(svgmin())
    .pipe(gulp.dest(buildApp.svg));
});

gulp.task('icons', () => {
  return gulp.src(srcApp.icons)
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true }))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').addClass('hide');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(buildApp.icons));
});

gulp.task('watch', () => {
  gulp.watch(srcApp.html, { debounceDelay: 300 }, ['html']);
  gulp.watch(srcApp.data + '**/*', { debounceDelay: 300 }, ['read:data', 'html']);
  gulp.watch(srcApp.css, ['css']);
  gulp.watch(srcApp.js, ['js']);
  gulp.watch(srcApp.img, ['images']);
  gulp.watch(srcApp.icons, ['icons']);
});

gulp.task('browser-sync', () => {
  var files = [
    buildApp.build
  ];

  browserSync.init(files, {
    server: {
      baseDir: './build/'
    },
  });

});

gulp.task('build', ['clean'], () => {
  gulp.start(
    'styleguide',
    'css',
    'read:data',
    'html',
    'js',
    'images',
    'svg',
    'icons'
  );
});

gulp.task('deploy', [], function () {
  return surge({
    project: './build',
    domain: 'example.surge.sh'
  })
})

gulp.task('default', [
  'build',
  'watch',
  'browser-sync'
]);
