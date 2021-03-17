let fileswatch = 'html,htm,txt,json,md,woff2,woff'; // List of files extensions for watching & hard reload

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'src/' },
    online: true,
    notify: false,
  });
}

function scripts() {
  return src('src/js/app.js')
    .pipe(
      webpack({
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env'],
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      regenerator: true,
                    },
                  ],
                  ['@babel/plugin-proposal-class-properties'],
                  ['babel-plugin-root-import'],
                ],
              },
            },
          ],
        },
      })
    )
    .on('error', function handleError() {
      this.emit('end');
    })
    .pipe(rename('bundle.min.js'))
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write())
    .pipe(
      autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })
    )
    .pipe(rename('bundle.min.css'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

function images() {
  return src(['src/images/src/**/*'])
    .pipe(newer('src/images/dist'))
    .pipe(imagemin())
    .pipe(dest('src/images/dist'))
    .pipe(browserSync.stream());
}

function buildcopy() {
  return src(
    [
      '{src/js,src/css}/*.min.*',
      'src/images/**/*.*',
      '!src/images/src/**/*',
      'src/fonts/**/*',
      'src/*.html',
    ],
    { base: 'src/' }
  ).pipe(dest('dist'));
}

function cleandist() {
  return del('dist/**/*', { force: true });
}

function startwatch() {
  watch('src/scss/**/*', { usePolling: true }, styles);
  watch(
    ['src/js/**/*.js', '!src/js/**/*.min.js'],
    { usePolling: true },
    scripts
  );
  watch(
    'src/images/src/**/*.{jpg,jpeg,png,webp,svg,gif}',
    { usePolling: true },
    images
  );
  watch(`src/**/*.{${fileswatch}}`, { usePolling: true }).on(
    'change',
    browserSync.reload
  );
}

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.assets = series(scripts, styles, images);
exports.build = series(cleandist, scripts, styles, images, buildcopy);
exports.default = series(
  scripts,
  styles,
  images,
  parallel(browsersync, startwatch)
);
