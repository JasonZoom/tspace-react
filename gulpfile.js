var browserify = require('browserify');
var gulp = require('gulp');
var config = require('./config')();
var del = require('del');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var vinylPaths = require('vinyl-paths');//在管道中将一些处理过的文件删除掉。
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

//开发环境添加版本号
gulp.task('testRev', function () {
    return gulp.src(config.devpath.devhtmlPath)
           .pipe(rev())
           .pipe(gulp.dest(config.dev+'/'));
});

//生产环境添加版本号
gulp.task('proRev',['htmlreplace'], function () {
    return gulp.src(config.propath.prohtmlPath)
           .pipe(rev())
           .pipe(gulp.dest(config.pro+'/'));
});

//react JSX转化JS
gulp.task('browserify', function(){
    return browserify(config.enterPoint)
         .transform(reactify)
         .bundle()
         .pipe(source(config.devbuildname))
         .pipe(gulp.dest(config.devbuildFPath));
});

//自动添加前缀//注意编辑器自带LESS转化CSS的，要最后执行TASK
gulp.task('testAutoFx',function () {
    return gulp.src(config.devcssFPath+'/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest(config.devcssFPath));
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['less','browserify'], function() {

    browserSync.init({
        server: config.dev+"/"
        // proxy: "127.0.0.1/mygulp/dist"
    });

    gulp.watch(config.devcssFPath+'/*.less', ['less','testRev']);
    gulp.watch(config.devpath.devhtmlPath).on('change', reload);
    gulp.watch(config.devpath.devjsPath, ['browserify','testRev']).on('change', reload);
});

// less编译后的css将注入到浏览器里实现更新
gulp.task('less',function() {
    return 	gulp.src(config.devcssFPath+'/*.less')
 			.pipe(less())
 			.pipe(gulp.dest(config.devcssFPath))
        	.pipe(reload({stream: true}));
});

//开启开发环境
gulp.task('reload', ['serve']);

//替换开发环境路径为生产环境路径
gulp.task('htmlreplace',function(){
	return gulp.src(config.dev+'/*.html')
			.pipe(htmlreplace({
				"js":config.commonFPath.buildFPath+"/"+config.probuildname+"?rev=@@hash",
				"css":config.commonFPath.cssFPath+"/"+config.procssname+"?rev=@@hash"
			}))
			.pipe(gulp.dest(config.pro+"/"));
});

//拷贝LIBS，放入目标文件夹
gulp.task("copylibs",function(){
	return gulp.src(config.devpath.devlibsPath)
			.pipe(gulp.dest(config.prolibsFPath));
});

//压缩buildJS，放入目标文件夹
gulp.task("minbuildjs",function(){
	return gulp.src(config.devbuildFPath+'/*.js')
			.pipe(uglify())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest(config.probuildFPath));
})

//压缩css，放入目标文件夹
gulp.task("mincss",['testAutoFx'],function(){
	return gulp.src([config.devcssFPath+config.commcss,config.devcssFPath+config.page+'.css'])
			.pipe(minifycss())
			.pipe(concat(config.procssname))
			.pipe(gulp.dest(config.procssFPath));
})

//压缩图片
gulp.task('imagemin', function(){

    return gulp.src(config.devpath.devimgPath)
        .pipe(imagemin())
        .pipe(gulp.dest(config.proimgFPath));
})
//生产环境打包

gulp.task("pro",["minbuildjs","mincss","copylibs",'imagemin','proRev']);