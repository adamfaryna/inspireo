const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const runSequence = require('run-sequence');
const vinylPaths = require('vinyl-paths');
const del = require('del');
const pug_plugin_ng = require('pug-plugin-ng');
const ts = require('gulp-ts');
const pug_opts = { doctype: 'html', plugins: [ pug_plugin_ng ] };

const paths = {
  style: ['./client/**/*.styl'],
  pug: ['./client/**/*.pug'],
  ts: ['./client/**/*.ts'],
  src: ['./client/**/*.{json,js,ico,ttf,ts}', './client/**/.*'],
  input: './client',
  output: './build_client',
  server: {
    input: './server/**/*.ts',
    output: './build_server'
  }
};

gulp.task('pug', done => {
  gulp.src(paths.pug, { base: paths.input })
    .pipe(pug(pug_opts))
    .pipe(gulp.dest(paths.output))
    .on('end', done);
});

gulp.task('style', done => {
  gulp.src(paths.style, { base: paths.input })
    .pipe(stylus())
    .pipe(gulp.dest(paths.output))
    .on('end', done);
});

gulp.task('copy', done => {
  gulp.src(paths.src, { base: paths.input })
    .pipe(gulp.dest(paths.output))
    .on('end', done);
});

gulp.task('ts:server', done => {
  gulp.src(paths.server.input, { base: paths.server.output })
    .pipe(ts())
    .pipe(gulp.dest(paths.server.output))
    .on('end', done);
});

gulp.task('watch', () => {
  gulp.watch(paths.style, ['style']);
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.src, ['copy']);
});

gulp.task('clean', () => {
  return gulp.src(`${paths.output}/**/*`, { read: false })
    .pipe(vinylPaths( filePath => {
      const basename = path.basename(filePath);
      if (basename !== 'app' && basename !== 'assets' && basename !== 'environments') {
        return del(filePath);
      }

      return Promise.resolve();
    }));
});

gulp.task('build', done => {
  runSequence('clean', 'default', done);
});

gulp.task('default', ['copy', 'style', 'pug']);
