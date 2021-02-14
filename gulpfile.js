const gulp = require('gulp')
const clean = require('gulp-clean')
const imagemin = require('gulp-imagemin')
const nunjucksRender = require('gulp-nunjucks-render')
const browsersync = require('browser-sync').create()


// Clean build
function cleanUp() {
    return gulp.src('./public', { allowEmpty: true, read: false }).pipe(clean())
}

// Browser sync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: './public/',
      },
      port: 8080,
    })
    done()
}

// Html
function html() {
    return gulp
        .src('src/pages/**/*.html')
        .pipe(nunjucksRender({
            path: ['src/components']
        }))
        .pipe(gulp.dest('public'))
        .pipe(browsersync.stream())
}

// Css
function css() {
    return gulp
        .src('src/css/**/*.css')
        .pipe(gulp.dest('public/css'))
        .pipe(browsersync.stream())
}

// Js
function js() {
    return gulp
    .src('src/js/**/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(browsersync.stream())
}

// Images
function img() {
    return gulp
    .src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'))
    .pipe(browsersync.stream())
}

// Watch files
function watchFiles() {
    gulp.watch('./src/css/**/*.css', css)
    gulp.watch('./src/js/**/*.js', js)
    gulp.watch(['./src/pages/**/*.html', './src/components/**/*.html'], html)
    gulp.watch('./src/img/**/*', img)
}


// Tasks
const build = gulp.series(
    cleanUp, 
    gulp.parallel(html, css, js, img)
)
const watch = gulp.parallel(watchFiles, browserSync)

gulp.task('clean', cleanUp)

gulp.task('default', gulp.series(build, watch))
