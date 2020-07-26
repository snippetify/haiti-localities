const assert = require('chai').assert
const district = require('../src/District')
const districts = require('../src/data/districts.json')

describe('District', function () {
    describe('#getAll()', function () {
        it('Should have the same length as JSON data', function () {
            assert.strictEqual(district.getAll().length, districts.flatMap(v => v.districts).length)
        })
    })

    describe('#has()', function () {
        it('Should have all districts in JSON data', function () {
            let has = true
            districts.flatMap(v => v.districts).forEach(v => { has = district.has(v.name) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(district.has('Arcahaie'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(district.has('lorem'))
        })
    })

    describe('#get()', function () {
        it('Should be the same as districts in JSON data', function () {
            const items = []
            districts
                .flatMap(v => v.districts)
                .forEach(v => { items.push(district.get(v.name)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v.name)),
                JSON.stringify(districts.flatMap(v => v.districts).flatMap(v => v.name)))
        })
        it('Value must be defined', function () {
            assert.isDefined(district.get('Arcahaie'))
        })
        it('Value must be undefined', function () {
            assert.isUndefined(district.get('lorem'))
        })
    })

    describe('#hasCounty()', function () {
        it('Should have all counties in JSON data', function () {
            let has = true
            districts.flatMap(v => v.county).forEach(v => { has = district.hasCounty(v) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(district.hasCounty('Ouest'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(district.hasCounty('lorem'))
        })
    })

    describe('#getByCounty()', function () {
        it('Should be the same as county\'s districts in JSON data', function () {
            const items = []
            districts
                .flatMap(v => v.county)
                .forEach(v => { items.push(district.getByCounty(v)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v).map(v => v.name)),
                JSON.stringify(districts.flatMap(v => v.districts).flatMap(v => v.name)))
        })
        it('Should have length greather than 0', function () {
            assert.isAbove(district.getByCounty('Ouest').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(district.getByCounty('lorem').length, 0)
        })
    })
})
