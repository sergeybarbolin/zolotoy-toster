var 	gulp 				  = require('gulp'), //подкл gulp
		  sass 				  = require('gulp-sass'), //подкл sass
		  browserSync 	= require ('browser-sync'),
		  concat				= require ('gulp-concat'),
		  del					  = require ('del'),
		  svgSprite 		= require("gulp-svg-sprites"),
		  plumber 			= require('gulp-plumber'),
		  replace 			= require('gulp-replace'),
	   	autoprefixer 	= require ('gulp-autoprefixer'),
		  notify 				= require("gulp-notify"),
		  tinypng 			= require('gulp-tinypng-compress'),
		  cheerio       = require('gulp-cheerio')



gulp.task('sass', function() {
	return gulp.src('sass/**/*.sass')
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true}))
	.pipe(gulp.dest('../dist/css'))
	.pipe(browserSync.reload({stream: true}))
})		



gulp.task('browser-sync', function() {
	browserSync({
    server: {
      baseDir: '../dist'
    },
    notify: false,
	});
});

gulp.task('tinypng', function () {
    gulp.src('../dist/img/tiny/*.{png,jpg,jpeg}')
    .pipe(tinypng({
        key: 'MqUNEWa0vy_9z5Wj_EQydwHBCRK4_8x8',
        sigFile: '../dist/images/tiny/.tinypng-sigs',
        summarize: true,
        log: true
    }))
	.pipe(notify('Сжато <%= file.relative %>!'))
  .pipe(gulp.dest('../dist/img'));
});



gulp.task('sprites', function () {
   return gulp.src('../dist/img/svg/*.svg')
    .pipe(svgSprite({
        mode: "symbols",
        preview: false,
        selector: "%f",
        svg: {
           symbols: 'sprite.svg' 
        }
      }
    ))
   	.pipe(replace('NaN ', '-'))
    .pipe(gulp.dest("../dist/img"));
});


gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch(['../dist/images/svg/*.svg'], ['sprites']);
	gulp.watch('../dist/*.html', browserSync.reload);
	gulp.watch('../dist/js/**/*.js', browserSync.reload);
	gulp.watch('../dist/css/**/*.css', browserSync.reload);
	gulp.watch(['../dist/images/tiny/*.{png,jpg,jpeg}'], ['tinypng']);
})