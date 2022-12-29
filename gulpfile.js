/*
 * Name: Scaffolding
 * Author: Craig Cooper
 * Author URI: http://craigomatic.co.uk
 * Description: A front-end framework
 * Version: 0.1.1
 */ 

// Paths
var pathSass     = 'src/scss/';
var pathJs       = 'src/js/';
var pathHtml     = 'src/html/';
var baseHtmlLoc  = 'src/html/templates/';
var pathImg      = 'src/images/';

// General
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var sourcemaps   = require('gulp-sourcemaps');

// Sass
var sass         = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');

// JavaScript
var eslint       = require('gulp-eslint');
var concat       = require('gulp-concat');
var uglify       = require('gulp-terser');

// Module Build
var nunjucksRender = require('gulp-nunjucks-render');

// Scripts object
var uiscripts = [
    pathJs + 'app.js',
    pathJs + 'libs/jquery.lazy.js'
];

var homescripts = [
    pathJs + 'libs/velocity.min.js',
    pathJs + 'libs/velocity.ui.min.js',
    pathJs + 'libs/scrollFX.js',
    pathJs + 'app.js',
    pathJs + 'libs/jquery.lazy.js'
];

// Sass
gulp.task('sass', function() {
    return gulp.src(pathSass + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', notify.onError('Sass lint failed.\n<%= error.message %>')))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

// JavaScript linting 
// excludes any third party scripts in libs
gulp.task('js-lint', function() {
    return gulp.src(
        [
            pathJs + '**/*', 
            '!' + pathJs + 'libs/**/*',
            '!' + pathJs + 'json/**/*'
        ]
    )
    .pipe(eslint())
    .pipe(plumber())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()
    .on('error', notify.onError('JS lint failed.\n<%= error.message %>')));
});

// JavaScript concat and minify
gulp.task('js', gulp.series('js-lint', function() {
    return gulp.src(uiscripts)
    //.pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
//    .pipe(uglify({
//      preserveComments: 'license'
//    }))
//    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
}));

// Homepage only
gulp.task('js1', gulp.series('js-lint', function() {
    return gulp.src(homescripts)
    .pipe(sourcemaps.init())
    .pipe(concat('home.min.js'))
//    .pipe(uglify({
//      preserveComments: 'license'
//    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
}));

// JavaScript watch
// Ensures the 'js' task is complete before reloading browsers
gulp.task('js-watch', gulp.series(['js', 'js1'], browserSync.reload));

// Nunjucks build
gulp.task('html', function() {
    return gulp.src('src/html/pages/**/*.njk')
    .pipe(nunjucksRender({
        path: ['src/html/templates']
    }))
    .pipe(gulp.dest('public/'))
});

// HTML watch
// Ensures the 'html' task is complete before reloading browsers
gulp.task('html-watch', gulp.series('html', browserSync.reload));



// Serve
gulp.task('serve', gulp.series('sass', 'js', 'js1', 'html', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        },
        notify: false
    });
    gulp.watch(pathSass + '**/*.scss', gulp.series('sass'));
    gulp.watch(pathJs + '**/*', gulp.series('js-watch'));
    gulp.watch(pathHtml + '**/*', gulp.series('html-watch'));
}));

// Tasks
gulp.task('default', gulp.series('sass', 'js', 'js1', 'html', 'serve', browserSync.reload));