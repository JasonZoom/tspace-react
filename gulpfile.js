var browserify = require('browserify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var autoprefixer = require('gulp-autoprefixer');//使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀
var less = require('gulp-less');//less转化成css
var minifycss = require('gulp-minify-css');//压缩Css
var browserSync = require('browser-sync').create()//且可以同时在PC、平板、手机等设备下进项调试,浏览器自动刷新页面
var reload      = browserSync.reload;
var rev = require('gulp-rev-append');//使用gulp-rev-append给页面的引用添加版本号，清除页面引用缓存。
var htmlreplace = require('gulp-html-replace');//替换HTML。
var rename = require('gulp-rename');//重命名
var imagemin = require('gulp-imagemin');//图片压缩



var path = {
		dev:"dev/",//开发环境
		pro:"pro/",//生产环境
		commonjs:"statics/js/",
		commonbuild:"statics/build/",
		commoncss:"statics/css/",
		js:['dev/statics/js/*.js','dev/js/**/*.js'],
		html:'dev/index.html',
		prohtml:'pro/index.html',
		libs:'pro/statics/libs',
		libsjs:'dev/statics/libs/*js',
		css:'dev/statics/css/*.less',
		devcsspath:'dev/statics/css',//less转css，存放文件夹
		img:'dev/statics/images/*.{jpg,png}',
		all:['dev/statics/images/*.{jpg,png}','dev/statics/js/*.js','dev/statics/js/**/*.js','dev/statics/index.html','dev/statics/css/*.less'],
		devjsoutpath:'dev/statics/build',
		proimgpath:'pro/statics/images',
		jsminname:'build.min.js',//压缩后JS文件的名字
		cssminname:'style.min.css',//压缩后css文件的名字
		jsx2jsbuildpath:'pro/statics/build',//转换后的JS压缩，存放文件夹
		procsspath:'pro/statics/css',//css压缩合并，存放文件夹
		jsx2jsbuildname:'build.js',//js通过Browserify打包后的文件
		reactpoint:'dev/statics/js/App.js'//react 入口
	}

//	把HTML文件，放入目标文件夹中
gulp.task('copy',function(){
	return gulp.src(path.html)
		   .pipe(gulp.dest(path.pro));
});

//开发环境添加版本号
gulp.task('testRev', function () {
    return gulp.src(path.html)
           .pipe(rev())
           .pipe(gulp.dest(path.dev));
});

//生产环境添加版本号
gulp.task('proRev', function () {
    return gulp.src(path.prohtml)
           .pipe(rev())
           .pipe(gulp.dest(path.pro));
});

//react JSX转化JS
gulp.task('browserify', function(){
    return browserify(path.reactpoint)
         .transform(reactify)
         .bundle()
         .pipe(source(path.jsx2jsbuildname))
         .pipe(gulp.dest(path.devjsoutpath));
});

//自动添加前缀//注意编辑器自带LESS转化CSS的，要最后执行TASK
gulp.task('testAutoFx',function () {
    return gulp.src(path.devcsspath+'/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest(path.devcsspath));
});


// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['less','browserify'], function() {

    browserSync.init({
        server: "dev/"
        // proxy: "127.0.0.1/mygulp/dist"
    });

    gulp.watch(path.css, ['less','testRev']);
    gulp.watch(path.html).on('change', reload);
    gulp.watch(path.js, ['browserify','testRev']).on('change', reload);
});

// less编译后的css将注入到浏览器里实现更新
gulp.task('less',function() {
    return 	gulp.src(path.css)
 			.pipe(less())
 			.pipe(gulp.dest(path.devcsspath))
        	.pipe(reload({stream: true}));
});

//开启开发环境
gulp.task('reload', ['serve']);

//替换开发环境路径为生产环境路径
gulp.task('htmlreplace',['copy'],function(){
	return gulp.src(path.html)
			.pipe(htmlreplace({
				"js":path.commonbuild+path.jsminname+"?rev=@@hash",
				"css":path.commoncss+path.cssminname+"?rev=@@hash"
			}))
			.pipe(gulp.dest(path.pro));
});

//拷贝LIBS，放入目标文件夹
gulp.task("copylibs",function(){
	return gulp.src(path.libsjs)
			.pipe(gulp.dest(path.libs));
});

//压缩buildJS，放入目标文件夹
gulp.task("minbuildjs",function(){
	return gulp.src(path.devjsoutpath+'/*.js')
			.pipe(uglify())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(path.jsx2jsbuildpath));
})

//压缩css，放入目标文件夹
gulp.task("mincss",['testAutoFx'],function(){
	return gulp.src(path.devcsspath+'/*.css')
			.pipe(minifycss())
			.pipe(concat(path.cssminname))
			.pipe(gulp.dest(path.procsspath));
})

//压缩图片
gulp.task('imagemin', function(){

    return gulp.src(path.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.proimgpath));
})
//生产环境打包

gulp.task("pro",["copylibs","minbuildjs","mincss",'htmlreplace','proRev']);