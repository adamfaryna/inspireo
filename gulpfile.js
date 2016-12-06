const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const runSequence = require('run-sequence');
const vinylPaths = require('vinyl-paths');
const del = require('del');
const pug_plugin_ng = require('pug-plugin-ng');
const ts = require('gulp-typescript');
const pug_opts = { doctype: 'html', plugins: [ pug_plugin_ng ] };

const paths = {
  client: {
    input: './client',
    output: './build_client',
    pug: './client/**/*.pug',
    style: './client/**/*.styl',
    ts: './client/**/*.ts',
    src: ['./client/**/*.{json,js,ico,ttf,ts}', './client/**/.*']
  }
  server: {
    input: './server/**/*.ts',
    output: './build_server'
  }
};

gulp.task('client:pug', done => {
  gulp.src(paths.client.pug, { base: paths.client.input })
    .pipe(pug(pug_opts))
    .pipe(gulp.dest(paths.client.output))
    .on('end', done);
});

gulp.task('client:style', done => {
  gulp.src(paths.client.style, { base: paths.client.input })
    .pipe(stylus())
    .pipe(gulp.dest(paths.client.output))
    .on('end', done);
});

gulp.task('client:copy', done => {
  gulp.src(paths.client.src, { base: paths.client.input })
    .pipe(gulp.dest(paths.client.output))
    .on('end', done);
});

gulp.task('ts:server', done => {
  gulp.src(paths.server.input, { base: paths.server.output })
    .pipe(ts({
      module: 'commonjs',
      target: 'es6'
    }))
    .pipe(gulp.dest(paths.server.output))
    .on('end', done);
});

gulp.task('client:watch', () => {
  gulp.watch(paths.client.style, ['client:style']);
  gulp.watch(paths.client.pug, ['client:pug']);
  gulp.watch(paths.client.src, ['client:copy']);
});

gulp.task('server:watch', () => {
  gulp.watch(paths.server.input, ['ts:server']);
});

gulp.task('watch', ['client:watch', 'server:watch']);

gulp.task('client:clean', () => {
  return gulp.src(`${paths.client.output}/**/*`, { read: false })
    .pipe(vinylPaths( filePath => {
      const basename = path.basename(filePath);
      if (basename !== 'app' && basename !== 'assets' && basename !== 'environments') {
        return del(filePath);
      }

      return Promise.resolve();
    }));
});

gulp.task('server:clean', () => {
  return gulp.src(`${paths.server.output}`, { read: false})
    .pipe(vinylPaths(del));
});

gulp.task('clean', ['client:clean', 'server:clean']);

gulp.task('client:build', () => {
  runSequence('client:clean', ['client:copy', 'client:style', 'client:pug'], done);
});

gulp.task('server:build', done => {
  runSequence('server:clean', 'ts:server', done);
});

gulp.task('build', 'default');

gulp.task('default', ['server:build', 'client:build']);
