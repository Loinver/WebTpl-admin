var pkg = require('./package.json');
var del = require('del');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-cssnano');
var util = require('./lib/util');
var bs = require('browser-sync').create(); // 自动刷新浏览器
var imagesmin = require('gulp-imagemin'); //图片压缩
var postcss = require('gulp-postcss'); // CSS 预处理
var uglify = require('gulp-uglify'); //js混淆编译
var rename = require("gulp-rename"); //copy文件
var concat = require("gulp-concat"); //合并文件
var header = require('gulp-header');
var sprite = require('gulp.spritesmith'); //雪碧图
var htmlmin = require('gulp-htmlmin'); //压缩html
// 注: Dev 阶段不开启 px -> rem
var $ = require('gulp-load-plugins')();

var paths = {
	src: { //开发目录
		dir: './src',
		images: './src/images/**/*.{JPG,jpg,png,gif}',
		fonts: './src/fonts/**/*.*',
		plugins: './src/js/lib/**/*.*',
		js: './src/js/define/*.js',
		sass: './src/css/index.scss',
		sassAll: './src/css/**/*.scss',
		pluginsCss: './src/css/plugins/*.css',
		html: './src/html/**/*.html',
		htmlAll: './src/html/**/*.html',
		spriteImg: './src/images/**/icon-*.png',
		cssRubbish: './src/css/rubbish/*.css'
	},
	dev: { //生产目录
		dir: './dev',
		css: './dev/css',
		html: './dev/html',
		images: './dev/images',
		js: './dev/js/define'
	}
}
module.exports = function(gulp, config) {
	// 复制操作
	var copyHandler = function(type, file) {
		file = file || paths['src'][type];
		return gulp.src(file, {
				base: paths.src.dir
			})
			.pipe(gulp.dest(paths.dev.dir))
			.on('end', reloadHandler);
	};
	// 自动刷新
	var reloadHandler = function() {
		config.livereload && bs.reload();
	};
	//清除目标目录
	function delDev() {
		return del([paths.dev.dir]);
	}
	//复制plugins
	function copyPlugins() {
		return copyHandler('plugins');
	}
	//复制字体
	function copyFont() {
		return copyHandler('fonts');
	}
	//生成雪碧图
	function compileSprite() {
		return gulp.src(paths.src.spriteImg) //合并图的地址
			.pipe(sprite({
				imgName: '../../images/common/sprite.png', //保存后合并的图的地址
				cssName: 'sprite.css', //生成的样式地址
				cssFormat: 'css',
				cssTemplate: function(data) {
					var arr = [];
					data.sprites.forEach(function(sprite) {
						arr.push("." + sprite.name +
							"{" +
							"display:inline-block;background-image: url('" + sprite.escaped_image + "');" +
							"background-position: " + sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
							"width:" + sprite.px.width + ";" +
							"height:" + sprite.px.height + ";" +
							"}\n");
					});
					return arr.join("");
				}
			}))
			.pipe(gulp.dest("./src/css/rubbish"))
			.on('data', function() {})
			.on('end', function() {
				concatCss();
				reloadHandler();
			});
	}
	//压缩图片
	function compileImage() {
		return gulp.src(paths.src.images)
			.pipe(imagesmin())
			.pipe(gulp.dest(paths.dev.images))
			.on('data', function() {})
			.on('end', reloadHandler);
	}
	//编译js
	function compileJs() {
		return gulp.src(paths.src.js)
			.pipe(uglify())
			.pipe(header('/*! <%= pkg.name %>-v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> By <%= pkg.author %> */\n', {
				pkg: pkg
			}))
			.pipe(gulp.dest(paths.dev.js))
			.on('data', function() {})
			.on('end', reloadHandler);
	}
	//编译 sass
	function compileSass() {
		return gulp.src(paths.src.sass)
			.pipe(sass())
			.pipe(minifyCSS({
				safe: true,
				reduceTransforms: false,
				advanced: false,
				compatibility: 'ie8',
				keepSpecialComments: 0
			}))
			.on('error', function(error) {
				console.log(error.message);
			})
			.pipe(header('/*! <%= pkg.email %> v<%= pkg.version %> <%= pkg.description %> <%= pkg.license %> By <%= pkg.author %> */\n', {
				pkg: pkg
			}))
			.pipe(gulp.dest("./src/css/rubbish"))
			.on('data', function() {})
			.on('end', reloadHandler);
	}
	//合并css
	function concatCss() {
		return gulp.src(paths.src.cssRubbish)
			.pipe(concat('index.css'))
			.pipe(gulp.dest(paths.dev.css))
			.on('data', function() {})
			.on('end', reloadHandler);
	}
	//复制插件css
	function copyPluginCss() {
		return gulp.src(paths.src.pluginsCss)
			.pipe(minifyCSS({
				safe: true,
				reduceTransforms: false,
				advanced: false,
				compatibility: 'ie8',
				keepSpecialComments: 0
			}))
			.pipe(gulp.dest(paths.dev.css))
			.on('data', function() {})
			.on('end', reloadHandler)
	}
	//编译 html
	function compileHtml() {
		var options = {
			removeComments: true, //清除HTML注释
			collapseWhitespace: true, //压缩HTML
			collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
			minifyJS: true, //压缩页面JS
			minifyCSS: true //压缩页面CSS
		};
		return gulp.src(paths.src.html)
			.pipe(htmlmin(options))
			.pipe(gulp.dest(paths.dev.html))
			.on('end', reloadHandler)
	}
	//启动 livereload
	function startServer() {
		bs.init({
			server: paths.dev.dir,
			port: config['livereload']['port'] || 8081,
			startPath: config['livereload']['startPath'] || '/',
			reloadDelay: 0,
			notify: { //自定制livereload 提醒条
				styles: [
					"margin: 0",
					"padding: 5px",
					"position: fixed",
					"font-size: 10px",
					"z-index: 9999",
					"bottom: 0px",
					"right: 0px",
					"border-radius: 0",
					"border-top-left-radius: 5px",
					"background-color: rgba(60,197,31,0.5)",
					"color: white",
					"text-align: center"
				]
			}
		});
	}
	//加载插件
	function loadPlugin(cb) {
		util.loadPlugin('build_dev');
		cb();
	}
	//监听文件
	function watch(cb) {
		var watcher = gulp.watch([
			paths.src.images,
			paths.src.fonts,
			paths.src.plugins,
			paths.src.js,
			paths.src.html,
			paths.src.sass,
			paths.src.sassAll,
			paths.src.htmlAll,
			paths.src.pluginsCss
		], {
			ignored: /[\/\\]\./
		});
		watcher
			.on('change', function(file) {
				util.log(file + '已经修改');
				watchHandler('changed', file);
			})
			.on('add', function(file) {
				util.log(file + '已经添加');
				watchHandler('add', file);
			})
			.on('unlink', function(file) {
				util.log(file + '已经删除');
				watchHandler('removed', file);
			});
		cb();
	}
	var watchHandler = function(type, file) {
		var target = file.match(/^src[\/|\\](.*?)[\/|\\]/);
		if(target == null) {
			target = "html"
		} else {
			target = target[1];
		}
		switch(target) {
			case 'images':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]);
				} else {
					compileSprite();
					compileImage();
				}
				break;
			case 'fonts':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]);
				} else {
					copyHandler('fonts', file);
				}
				break;
			case 'js':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]);
				} else {
					compileJs();
				}
				break;
			case 'plugins':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]);
				} else {
					copyHandler('plugins', file);
				}
				break;
			case 'css':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev').replace('.scss', '.css');
					del([tmp]);
				} else {
					compileSass();
					compileSprite();
				}
				break;
			case 'pluginsCss':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]);
				} else {
					copyPluginCss();
				}
				break;
			case 'html':
				if(type === 'removed') {
					var tmp = file.replace('src', 'dev');
					del([tmp]).then(function() {
						util.loadPlugin('build_dev');
					});
				} else {
					compileHtml();
				}
				if(type === 'add') {
					setTimeout(function() {
						util.loadPlugin('build_dev');
					}, 500);
				}
				break;
		}
	}
	//注册 build_dev 任务
	gulp.task('default', gulp.series(
		delDev,
		gulp.parallel(
			copyPlugins,
			copyFont,
			compileSass,
			copyPluginCss,
			compileHtml,
			compileJs,
			compileSprite,
			compileImage
		),
		gulp.parallel(
			watch,
			loadPlugin
		),
		startServer
	));
}