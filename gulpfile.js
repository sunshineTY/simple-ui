"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");
var del = require("del");

// 拷贝html
gulp.task("copyHtml", function () {
	gulp.src("src/view/*.html")
	.pipe(gulp.dest("dist/view"))
	.pipe(connect.reload());
})

// 解析sass，并拷贝到css
gulp.task("copySass", function () {
	gulp.src("src/css/*.scss")
	.pipe(sass())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

// 拷贝fonts
gulp.task("copyFont", function () {
	gulp.src("src/css/fonts/*")
	.pipe(gulp.dest("dist/css/fonts"))
})

// 拷贝js
gulp.task("copyJs", function () {
	gulp.src("src/js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

// 拷贝手册
gulp.task("copyManual", function () {
	gulp.src("src/manual/**/*")
	.pipe(gulp.dest("dist/manual"))
	.pipe(connect.reload());
})

// 创建服务
gulp.task('server', function () {
	connect.server({
		port: 8010,
		livereload: true
	})
})

// 监听变化
gulp.task("watchAll", function () {
	var watcher = gulp.watch("src/**/*", ["copyHtml", "copySass", "copyFont", "copyJs", "copyManual"]);
	watcher.on("change", function (event) {
		if ( event.type === 'deleted' ) {
			var srcFile = event.path;
			var distFile = srcFile.replace('\\src\\', '\\dist\\').replace('.scss', '.css');

			del(distFile);
		}
	})
})

// 热监听
gulp.task("hotWatch", ["server", "watchAll"])
