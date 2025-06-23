import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
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

function images() {
  return src('src/img/**/*.{jpg,jpeg,png,gif,svg}').pipe(imagemin()).pipe(dest('dist/img'));
}
function serve() {
  html();
  css();
  js();
  images();
  browserSync.init({
    server: {
      baseDir: 'dist',
      serveStaticOptions: {
        extensions: ['html', 'png', 'jpg', 'jpeg', 'svg'],
      },
    },
  });

  watch('src/*.html', html).on('change', browserSync.reload);
  watch('src/*.css', css).on('change', browserSync.reload);
  watch('src/*.js', js).on('change', browserSync.reload);
  watch('src/img/**/*', images).on('change', browserSync.reload);
}

const build = series(clean, parallel(html, css, js, images));

export default series(build, serve);
export { clean, build };
