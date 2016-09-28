var gulp = require('gulp');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2));//gulp.env已经过时
module.exports = function(){
	var ts = {};
	var dev =ts.dev= 'dev';
	var pro =ts.pro = 'pro';
	ts.page = 'index';//默认index.html
	ts.enterPoint = 'dev/statics/js/App.js';//开发环境下的入口文件

	ts.devbuildname = ts.page+'build.js';
	ts.probuildname  = ts.page+'build.min.js';

	ts.procssname  = ts.page+'style.min.css';
	//公共CSS
	ts.commcss = 'common.css';

	
	ts.commonFPath = {//结构目录
		htmlFPath :'/',
		cssFPath :'statics/css',
		jsFPath :'statics/js',//PRO没有这个文件夹
		buildFPath:'statics/build',
		imgFPath :'statics/images',
		libsFPath:'statics/libs'
	}
	var tc = ts.commonFPath;
	var devjsFPath    =ts.devjsFPath = dev+'/'+tc.jsFPath;
	var devcssFPath   =ts.devcssFPath= dev+'/'+tc.cssFPath;
	var devbuildFPath =ts.devbuildFPath= dev+'/'+tc.buildFPath;
	var devimgFPath   =ts.devimgFPath = dev+'/'+tc.imgFPath;
	var devlibsFPath  =ts.devlibsFPath= dev+'/'+tc.libsFPath;
	var probuildFPath =ts.probuildFPath= pro+'/'+tc.buildFPath;
	var procssFPath   =ts.procssFPath= pro+'/'+tc.cssFPath;
	var proimgFPath   =ts.proimgFPath = pro+'/'+tc.imgFPath;
	var prolibsFPath  =ts.prolibsFPath= pro+'/'+tc.libsFPath;
	ts.devpath = {//
		//dev 当前开发page.html
		devhtmlPath :dev+'/'+ts.page+'.html',
		//dev react 原文件
		devjsPath :[devjsFPath+'/*.js',devjsFPath+'/**/*.js'],
		//dev未压缩的CSS
		devcssPath:devcssFPath+'/*.css',
		//dev react 打包成build.js
		devbuildPath:devbuildFPath+'/*.js',
		//dev 图片
		devimgPath:[devimgFPath+'/*.{jpg,png,gif}',devimgFPath+'/**/*.{jpg,png,gif}'],
		//dev LIBS
		devlibsPath:[devlibsFPath+'/*.js',devlibsFPath+'/**/*.js']
	}
	ts.propath = {//
		//pro 当前开发page.html
		prohtmlPath :pro+'/'+ts.page+'.html',
		//pro LIBS
		prolibsPath:[pro+'/'+tc.libsFPath+'/*.js',pro+'/'+tc.libsFPath+'/**/*.js']
	}
	

	//console.log(ts);
	return ts;
	
}