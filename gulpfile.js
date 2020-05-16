let gulp = require("gulp"),
    autoprefixer = require("autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    cssnano = require("cssnano"),
    browsersync = require("browser-sync").create();

let paths = {
    styles: {
        src: "src/scss/*.scss",
        
        dest: "src/css"
    }
}

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function reload() {
    browsersync.reload()
}

function watch() {
    browsersync.init({
        server: {
            baseDir: "./src"
        }
    })
    gulp.watch(paths.styles.src, style)
    gulp.watch("src/*.html").on('change', reload)
}

exports.watch = watch
exports.style = style

let build = gulp.parallel(style, watch)

gulp.task('default', build)