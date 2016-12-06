const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const runSequence = require('run-sequence');
const vinylPaths = require('vinyl-paths');
const del = require('del');
const pug_plugin_ng = require('pug-plugin-ng');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const pug_opts = { doctype: 'html', plugins: [ pug_plugin_ng ] };

const paths = {
  client: {
    input: './client',
    output: './build_client',
    pug: './client/**/*.pug',
    style: './client/**/*.styl',
    src: ['./client/**/*.{json,js,ico,ttf,ts}', './client/**/.*']
  },
  server: {
    input: './server',
    ts: './server/**/*.ts',
    output: './build_server',
    src: './server/**/*.ts'
  },
  shared: {
    input: './shared',
    ts: './shared/**/*.ts'
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

gulp.task('client:ts', ['client:shared:ts']);

gulp.task('client:shared:ts', () => {
  gulp.src(paths.shared.ts, { base: paths.shared.input})
    .pipe(gulp.dest(`${paths.client.output}/app`));
});

gulp.task('server:ts', () => {
  const tsProject = ts.createProject('tsconfig.server.json', {
    typescript: require('typescript')
  });

  const result = gulp.src([ paths.server.ts, paths.shared.ts ])
    .pipe(sourcemaps.init())
    .pipe(tsProject());

    return result.js
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.server.output));
});

gulp.task('client:watch', () => {
  gulp.watch(paths.client.style, ['client:style']);
  gulp.watch(paths.client.pug, ['client:pug']);
  gulp.watch(paths.client.src, ['client:copy']);
});

gulp.task('server:watch', () => {
  gulp.watch(paths.server.src, ['server:ts']);
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

gulp.task('client:build', ['client:ts', 'client:copy', 'client:style', 'client:pug']);
gulp.task('server:build', ['server:ts']);
gulp.task('build', ['default']);

gulp.task('default', done => {
  runSequence('clean', ['client:build', 'server:build'], done);
});
