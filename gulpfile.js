const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['dev']);

gulp.task('compile-server', () => {
    return gulp.src('server/src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build'));
});

gulp.task('copy-swagger-config', () => {
    return gulp.src('server/src/api/swagger/**/*')
        .pipe(gulp.dest('build/api/swagger'));
})

gulp.task('copy-swagger-ui', () => {
    return gulp.src('swagger-ui/**/*')
        .pipe(gulp.dest('build/swagger-ui'));
})

gulp.task('copy-config', ['copy-swagger-config', 'copy-swagger-ui'], () => {
    return gulp.src('server/src/config/**/*')
        .pipe(gulp.dest('build/config'));
})

gulp.task('dev', ['compile-server', 'copy-config'], () => {
    nodemon({
        script: 'build/server.js',
        ext: 'js, ts',
        tasks: ['compile-server'],
        watch: 'server'
    })
});