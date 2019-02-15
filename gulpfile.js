// https://qiita.com/KazuyoshiGoto/items/8b788279490a6dd006d9
var gulp = require('gulp');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var browserSync = require("browser-sync");

//setting : paths
var paths = {
  'scss': './src/sass/',
  'css': './docs/css/',
  'pug': './src/pug/',
  'html': './docs/',
  'js': './docs/js/'
}
//setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed'
}
//setting : Pug Options
var pugOptions = {
  pretty: true
}

//Sass
gulp.task('scss', function () {
  gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
});

//Pug
gulp.task('pug', () => {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.js + "**/*.js", ['reload']);
  gulp.watch(paths.html + "**/*.html", ['reload']);
  gulp.watch(paths.css + "**/*.css", ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

//watch
gulp.task('watch', function () {
  gulp.watch(paths.scss + '**/*.scss', ['scss']);
  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);
