var browserify = require('browserify');
var gulp = require('gulp');
var react = require('gulp-react');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var less = require('gulp-less');//less转化成css
var minifycss = require('gulp-minify-css');//压缩Css
var browserSync = require('browser-sync').create()//且可以同时在PC、平板、手机等设备下进项调试,浏览器自动刷新页面
var reload      = browserSync.reload;
var rev = require('gulp-rev-append');//使用gulp-rev-append给页面的引用添加版本号，清除页面引用缓存。



var path = {
		js:['src/js/*.js','src/js/**/*.js'],
		html:'src/index.html',
		css:'src/css/*.less',
		img:'src/img/*.{jpg,png}',
		all:['src/img/*.{jpg,png}','src/js/*.js','src/js/**/*.js','src/index.html','src/css/*.less'],
		dist:'dist',
		distjspath:'dist/js',
		distimgpath:'dist/img',
		distcsspath:'dist/css',
		jsminname:'all.min.js',//压缩后JS文件的名字
		jsx2jsbuildpath:'dist/build',//转换后的JS压缩，存放文件夹
		jsx2jspath:"dist/js_c",//jsx转换成JS后的文件夹
		jsx2jsbuildname:'build.min.js',//js通过Browserify打包后的文件
		reactpoint:'src/js/App.js'//react 入口
	}

gulp.task('testRev', function () {
    gulp.src('src/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function(){
  return browserify('src/js/commentbox.js')
         .transform(reactify)
         .bundle()
         .pipe(source('build.js'))
         .pipe(gulp.dest('dist/js'));
});
/**	把HTML文件，放入目标文件夹中*/
gulp.task('copy',function(){
	return gulp.src(path.html)
			.pipe(gulp.dest(path.dist));
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "dist/"
        // proxy: "127.0.0.1/mygulp/dist"
    });

    gulp.watch("src/css/*.css", ['less','testRev']);
    gulp.watch("src/*.html",['copy']).on('change', reload);
    gulp.watch("src/js/*.js", ['browserify','testRev']).on('change', reload);;
});

// less编译后的css将注入到浏览器里实现更新
gulp.task('less', function() {
    return 	gulp.src(path.css)
 			.pipe(less())
 			.pipe(minifycss())
 			.pipe(gulp.dest(path.distcsspath))
        	.pipe(reload({stream: true}));
});

gulp.task('reload', ['serve']);
