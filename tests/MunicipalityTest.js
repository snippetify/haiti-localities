const assert = require('chai').assert
const municipality = require('../src/Municipality')
const municipalities = require('../src/data/municipalities.json')

describe('Municipality', function () {
    describe('#getAll()', function () {
        it('Should have the same length as JSON data', function () {
            assert.strictEqual(municipality.getAll().length, municipalities.flatMap(v => v.municipalities).length)
        })
    })

    describe('#has()', function () {
        it('Should have all municipalities in JSON data', function () {
            let has = true
            municipalities.flatMap(v => v.municipalities).forEach(v => { has = municipality.has(v.name) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(municipality.has("Anse d'Hainault"))
        })
        it('Should not contain value', function () {
            assert.isNotOk(municipality.has('lorem'))
        })
    })

    describe('#get()', function () {
        it('Should be the same as municipalities in JSON data', function () {
            const items = []
            municipalities
                .flatMap(v => v.municipalities)
                .forEach(v => { items.push(municipality.get(v.name)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v.name)),
                JSON.stringify(municipalities.flatMap(v => v.municipalities).flatMap(v => v.name)))
        })
        it('Value must be defined', function () {
            assert.isDefined(municipality.get("Anse d'Hainault"))
        })
        it('Value must be undefined', function () {
            assert.isUndefined(municipality.get('lorem'))
        })
    })

    describe('#hasDistrict()', function () {
        it('Should have all districts in JSON data', function () {
            let has = true
            municipalities.flatMap(v => v.district).forEach(v => { has = municipality.hasDistrict(v) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(municipality.hasDistrict('Corail'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(municipality.hasDistrict('lorem'))
        })
    })

    describe('#getByDistrict()', function () {
        it('Should be the same as district\'s municipalities in JSON data', function () {
            const items = []
            municipalities
                .flatMap(v => v.district)
                .forEach(v => { items.push(municipality.getByDistrict(v)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v).map(v => v.name)),
                JSON.stringify(municipalities.flatMap(v => v.municipalities).flatMap(v => v.name)))
        })
        it('Should have length greather than 0', function () {
            assert.isAbove(municipality.getByDistrict('Corail').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(municipality.getByDistrict('lorem').length, 0)
        })
    })
})
