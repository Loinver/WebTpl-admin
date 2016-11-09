// 引入 gulp
var gulp = require('../../../node_modules/gulp');
// 引入组件
var jshint = require('../../../node_modules/gulp-jshint'); //js检查插件
var sass = require('../../../node_modules/gulp-sass'); //sass
var concat = require('../../../node_modules/gulp-concat'); //合并js文件
var uglify = require('../../../node_modules/gulp-uglify'); //压缩js文件
var rename = require('../../../node_modules/gulp-rename'); //重命名插件
var cssmin = require('../../../node_modules/gulp-clean-css'); //压缩css
var notify = require('../../../node_modules/gulp-notify'); //gulp提示
var imagesmin = require('../../../node_modules/gulp-imagemin'); //图片压缩
var htmlmin = require('../../../node_modules/gulp-htmlmin'); //压缩html文件
var sprite = require('../../../node_modules/gulp.spritesmith'); //雪碧图
var autoprefixer = require('../../../node_modules/gulp-autoprefixer'); //自动补全前缀
var livereload = require('../../../node_modules/gulp-livereload'); //自动刷新浏览器
var cache = require('../../../node_modules/gulp-cache');
var pngquant = require('../../../node_modules/imagemin-pngquant');
//npm install gulp gulp-clean-css gulp-notify gulp.spritesmith gulp-imagemin gulp-cache imagemin-pngquant gulp-htmlmin gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename gulp-livereload gulp-autoprefixer --save-dev
// 检查js
gulp.task('jslint', function() {
  return gulp.src('./Dev/src/js/define/mine/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify("js检查完成！"));
});
// 编译Sass
gulp.task('sass', function() {
  return gulp.src('./Dev/src/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['not ie <8', 'Firefox >= 20'],
      cascade: false,
    }))
    //.pipe(cssmin())
    .pipe(gulp.dest('./Dev/src/css'))
    .pipe(notify("css压缩完成！"));
});
// 合并，压缩js文件
gulp.task('scripts', function() {
  return gulp.src('./Dev/src/js/define/*.js')
    //.pipe(uglify())
    .pipe(gulp.dest('./Release/src/js/define'))
    .pipe(livereload())
    .pipe(notify("js压缩完成！"));
});
//迁移 lib  js
gulp.task('libjs', function() {
  return gulp.src('./Dev/src/js/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./Release/src/js/lib'))
    .pipe(notify("lib js生成成功"));
});
// 图片压缩
gulp.task('imagesmin', function() {
  return gulp.src('./Dev/src/imgs/**/*.{jpg,png,gif}')
    //.pipe(imagesmin())
    .pipe(cache(imagesmin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('./Release/src/imgs'))
    .pipe(notify('图片任务完成'));
});
//压缩html文件
gulp.task('htmlmin', function() {
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
  return gulp.src('./Dev/web/**/*.html')
    //.pipe(htmlmin(options))
    .pipe(gulp.dest('./Release/web'))
    .pipe(livereload())
    .pipe(notify("web页面压缩完成"));
});
//雪碧图生成
gulp.task('sprites', function() {
  return gulp.src('./Dev/src/imgs/icon/icon-' + '*.png') //合并图的地址
    .pipe(sprite({
      imgName: '../imgs/common/sprite.png', //保存后合并的图的地址
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
    .pipe(gulp.dest('./Dev/src/css'))
    //.pipe(gulp.dest('./Release/src/css'))
    .pipe(notify("雪碧图生成成功"));
});
//合并css任务
gulp.task('concatcss', function() {
  return gulp.src('./Dev/src/css/*.css')
    .pipe(concat('index.css'))
    //.pipe(gulp.dest('./Dev/src/css'))
    .pipe(gulp.dest('./Release/src/css'))
    .pipe(livereload())
    .pipe(notify("css合并完成"));
});
//生成插件css任务
gulp.task('plugincss', function() {
  return gulp.src('./Dev/src/css/plugin/*.css')
    .pipe(gulp.dest('./Release/src/css'))
    .pipe(notify("插件css生成完成"));
});
// 默认任务
gulp.task('default', function() {
  gulp.run('imagesmin', 'sprites', 'sass', 'jslint', 'libjs', 'scripts', 'plugincss', 'concatcss', 'htmlmin');
  gulp.watch('./Dev/src/js/**/*.js', function() {
    livereload.listen();
    gulp.run('jslint', 'libjs', 'scripts');
  })
  gulp.watch('./Dev/src/imgs/**/*.{png,jpg,gif,ico}', function() {
    livereload.listen();
    gulp.run('sprites', 'imagesmin');
  })
  gulp.watch('./Dev/web/**/*.html', function() {
    livereload.listen();
    gulp.run('htmlmin', 'sprites', 'imagesmin');
  })
  gulp.watch('./Dev/src/css/**/*.scss', function() {
    livereload.listen();
    gulp.run('sass');
  })
  gulp.watch('./Dev/src/css/*.css', function() {
    livereload.listen();
    gulp.run('concatcss');
  })
  gulp.watch('./Dev/src/css/plugin/*.css', function() {
    livereload.listen();
    gulp.run('plugincss');
  })
});