"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var connect = require("gulp-connect");

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
	gulp.watch("src/**/*", ["copyHtml", "copySass", "copyJs", "copyManual"]);
})

// 热监听
gulp.task("hotWatch", ["server", "watchAll"])