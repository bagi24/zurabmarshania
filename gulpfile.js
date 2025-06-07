const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const del = require('del');

const paths = {
  html: ['src/*.html', 'src/pages/**/*.html'],
  css: 'src/css/**/*.css',
  js: 'src/js/**/*.js',
  dist: 'dist',
};

function html() {
  return src(paths.html, { base: 'src' }) // <<< ეს არის მნიშვნელოვანი
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.dist))
    .pipe(connect.reload());
}

function css() {
  return src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${paths.dist}/css`))
    .pipe(connect.reload());
}

function js() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(`${paths.dist}/js`))
    .pipe(connect.reload());
}

function serve(cb) {
  connect.server({
    root: 'dist',
    livereload: true,
  });
  cb();
}

function clean() {
  return del([paths.dist]);
}

function watcher() {
  watch(paths.html, html);
  watch(paths.css, css);
  watch(paths.js, js);
}

exports.default = series(clean, parallel(html, css, js), serve, watcher);

exports.build = series(clean, parallel(html, css, js));
