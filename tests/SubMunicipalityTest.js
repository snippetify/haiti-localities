const assert = require('chai').assert
const submunicipality = require('../src/SubMunicipality')
const submunicipalities = require('../src/data/submunicipalities.json')

describe('SubMunicipality', function () {
    describe('#getAll()', function () {
        it('Should have the same length as JSON data', function () {
            assert.strictEqual(submunicipality.getAll().length, submunicipalities.flatMap(v => v.submunicipalities).length)
        })
    })

    describe('#has()', function () {
        it('Should have all submunicipalities in JSON data', function () {
            let has = true
            submunicipalities.flatMap(v => v.submunicipalities).forEach(v => { has = submunicipality.has(v.name) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(submunicipality.has('Boucassin'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(submunicipality.has('lorem'))
        })
    })

    describe('#get()', function () {
        it('Should be the same as submunicipalities in JSON data', function () {
            const items = []
            submunicipalities
                .flatMap(v => v.submunicipalities)
                .forEach(v => { items.push(submunicipality.get(v.name)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v.name).slice(0, 10)),
                JSON.stringify(submunicipalities.flatMap(v => v.submunicipalities).flatMap(v => v.name).slice(0, 10))
            )
        })
        it('Value must be defined', function () {
            assert.isDefined(submunicipality.get('Boucassin'))
        })
        it('Value must be undefined', function () {
            assert.isUndefined(submunicipality.get('lorem'))
        })
    })

    describe('#hasMunicipality()', function () {
        it('Should have all municipalities in JSON data', function () {
            let has = true
            submunicipalities.flatMap(v => v.municipality).forEach(v => { has = submunicipality.hasMunicipality(v) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(submunicipality.hasMunicipality('Arcahaie'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(submunicipality.hasMunicipality('lorem'))
        })
    })

    describe('#getByMunicipality()', function () {
        it('Should be the same as municipality\'s submunicipalities in JSON data', function () {
            const items = []
            submunicipalities
                .flatMap(v => v.municipality)
                .forEach(v => { items.push(submunicipality.getByMunicipality(v)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v).map(v => v.name)),
                JSON.stringify(submunicipalities.flatMap(v => v.submunicipalities).flatMap(v => v.name)))
        })
        it('Should have length greather than 0', function () {
            assert.isAbove(submunicipality.getByMunicipality('Arcahaie').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(submunicipality.getByMunicipality('lorem').length, 0)
        })
    })
})
