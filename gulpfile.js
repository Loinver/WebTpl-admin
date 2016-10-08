// 引入 gulp
var gulp = require('../node_modules/gulp');
// 引入组件
var jshint = require('../node_modules/gulp-jshint'); //js检查插件
var sass = require('../node_modules/gulp-sass'); //sass
var concat = require('../node_modules/gulp-concat'); //合并js文件
var uglify = require('../node_modules/gulp-uglify'); //压缩js文件
var rename = require('../node_modules/gulp-rename'); //重命名插件
var cssmin = require('../node_modules/gulp-clean-css'); //压缩css
var notify = require('../node_modules/gulp-notify'); //gulp提示
var imagesmin = require('../node_modules/gulp-imagemin'); //图片压缩
var htmlmin = require('../node_modules/gulp-htmlmin'); //压缩html文件
var sprite = require('../node_modules/gulp.spritesmith'); //雪碧图
//npm install gulp gulp-clean-css gulp-notify gulp.spritesmith gulp-imagemin gulp-htmlmin gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev
// 检查js
gulp.task('jslint', function() {
  gulp.src('./Dev/src/js/define/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify("js检查完成！"));
});
// 编译css
gulp.task('cssmin', function() {
  gulp.src('./Dev/src/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./Release/src/css'))
    .pipe(notify("css压缩完成！"));
});
// 合并，压缩js文件
gulp.task('scripts', function() {
  gulp.src('./Dev/src/js/define/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./Release/src/js/define'))
    .pipe(notify("js压缩完成！"));
});
// 图片压缩
gulp.task('imagesmin', function() {
  gulp.src('./Dev/src/img/**/*.{jpg,png,gif,jpeg}')
    .pipe(imagesmin())
    .pipe(gulp.dest('./Release/src/img'))
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
  gulp.src('./Dev/html/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./Release/html'))
    .pipe(notify("页面压缩完成"));
});
//雪碧图生成
gulp.task('sprites', function() {
  gulp.src('./Dev/src/img/icon-' + '*.png')
    .pipe(sprite({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      cssFormat: 'css',
      //    cssTemplate: function(data) {
      //      var arr = [];
      //      data.sprites.forEach(function(sprite) {
      //        arr.push("." + sprite.name +
      //          "{" +
      //          "background-image: url('../images/" + sprite.escaped_image + "');" +
      //          "background-position: " + sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
      //          "width:" + sprite.px.width + ";" +
      //          "height:" + sprite.px.height + ";" +
      //          "}\n");
      //      });
      //      return arr.join("");
      //    }
    }))
    .pipe(gulp.dest('./Release/src/css'))
    .pipe(notify("雪碧图生成成功"));
});
// 默认任务
gulp.task('default', function() {
  gulp.run('jslint', 'sprites', 'cssmin', 'scripts', 'imagesmin', 'htmlmin');
  // 监听文件变化
  gulp.watch(['./Dev/src/js/*/*.js', './Dev/src/css/*.css', './Dev/src/img/**/*.{png,jpg,jpeg,gif,ico}', './Dev/html/*.html'], function() {
    gulp.run('jslint', 'sprites', 'cssmin', 'scripts', 'imagesmin', 'htmlmin');
  });
});
