/**
 * Gulp default configuration.
 * @license MIT
 * @author Evens Pierre <pierre.evens16@gmail.com>
 * @website https://github.com/snippetify
 */
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const jsonmin = require('gulp-json-minify')
const rollup = require('gulp-better-rollup')
const sourcemaps = require('gulp-sourcemaps')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const { src, dest, series, parallel } = require('gulp')

function jsTranspile () {
    return src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(sourcemaps.write())
        .pipe(dest('tmp'))
}

function jsRollup () {
    return src('tmp/**/*.js')
        .pipe(rollup({ plugins: [resolve(), commonjs()] }, 'umd'))
        .pipe(dest('tmp'))
}

function jsMinify () {
    return src('tmp/**/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(dest('dist'))
}

function jsonMinify () {
    return src('src/**/*.json')
        .pipe(jsonmin())
        .pipe(dest('dist'))
        .pipe(dest('tmp'))
}

function jsLint () {
    return src('src/**/*.js')
        .pipe(eslint({
            env: {
                es6: true
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

function cleanTmp () {
    return src('tmp', { read: false, allowEmpty: true }).pipe(clean())
}

function cleanDist () {
    return src('dist', { read: false, allowEmpty: true }).pipe(clean())
}

exports.clean = parallel(cleanDist, cleanTmp)
exports.default = series(
    cleanDist,
    parallel(jsLint),
    parallel(jsTranspile, jsonMinify),
    jsRollup,
    parallel(jsMinify),
    cleanTmp
)
