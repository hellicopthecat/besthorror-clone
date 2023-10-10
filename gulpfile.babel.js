import gulp from "gulp";
import {deleteSync} from "del";
import minify from "gulp-csso";
import gulpSass from "gulp-sass";
import sass2 from "sass";
import autoprefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import replace from "gulp-replace";
import image from "gulp-image";

const jquery = "./src/js/jquery.min.js";
const sass = gulpSass(sass2);

const routes = {
  html: {
    watch: "./index.html",
    dest: "dest/",
  },
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dest/css",
  },
  js: {
    watch: "src/js/*",
    src: "src/js/index.js",
    dest: "dest/js",
  },
  image: {
    watch: "src/img/*",
    dest: "dest/img",
  },
};

const homepage = () => {
  gulp
    .src(routes.html.watch)
    .pipe(replace("dest/css/", "css/"))
    .pipe(replace('<script src="src/js/jquery.min.js"></script>', ""))
    .pipe(replace("src/js/", "js/"))
    .pipe(gulp.dest(routes.html.dest));
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace",
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const js = () => {
  gulp
    .src([jquery, routes.js.src])
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(gulp.dest(routes.js.dest));
};

const img = () => {
  gulp.src(routes.image.watch).pipe(image()).pipe(gulp.dest(routes.image.dest));
};

const watch = () => {
  gulp.watch(routes.html.watch, homepage);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.image.watch, img);
};

const clean = async () => await deleteSync(["dest/"]);

const prepare = async () => await clean();

const assets = async () => {
  await homepage();
  await styles();
  await js();
  await img();
};

const live = gulp.parallel([watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
// export const deploy = gulp.series([build, ghDeploy]);
