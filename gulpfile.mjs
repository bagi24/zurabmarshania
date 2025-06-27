import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

import { deleteSync } from 'del';

const { src, dest, series, parallel, watch } = gulp;

function clean(done) {
  deleteSync(['dist']);
  done();
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function css() {
  return src('src/*.css').pipe(cleanCSS()).pipe(dest('dist'));
}

function js() {
  return src('src/*.js').pipe(uglify()).pipe(dest('dist'));
}

function convertToWebp() {
  return src('src/img/*').pipe(dest('dist/img'));
}

function serve() {
  html();
  css();
  js();
  convertToWebp();
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });

  watch('src/*.html', html).on('change', browserSync.reload);
  watch('src/*.css', css).on('change', browserSync.reload);
  watch('src/*.js', js).on('change', browserSync.reload);
  watch('src/img/*', convertToWebp).on('change', browserSync.reload);
}

const build = series(clean, parallel(html, css, js, convertToWebp));

export default series(build, serve);
export { clean, build };
