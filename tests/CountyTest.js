const assert = require('chai').assert
const county = require('../src/County')
const counties = require('../src/data/counties.json')

describe('County', function () {
    describe('#getAll()', function () {
        it('Should have the same length as JSON data', function () {
            assert.strictEqual(county.getAll().length, counties.length)
        })
    })

    describe('#has()', function () {
        it('Should have all counties in JSON data', function () {
            let has = true
            counties.forEach(v => { has = county.has(v.name) })
            assert.isOk(has)
        })
        it('Should contain value', function () {
            assert.isOk(county.has('Artibonite'))
        })
        it('Should not contain value', function () {
            assert.isNotOk(county.has('lorem'))
        })
    })

    describe('#get()', function () {
        it('Should be the same as counties in JSON data', function () {
            const items = []
            counties.forEach(v => { items.push(county.get(v.name)) })
            assert.strictEqual(
                JSON.stringify(items.flatMap(v => v.name)),
                JSON.stringify(counties.flatMap(v => v.name)))
        })
        it('Value must be defined', function () {
            assert.isDefined(county.get('Artibonite'))
        })
        it('Value must be undefined', function () {
            assert.isUndefined(county.get('lorem'))
        })
    })
})
