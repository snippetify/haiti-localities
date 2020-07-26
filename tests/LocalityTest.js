const assert = require('chai').assert
const locality = require('../src/Locality')
const counties = require('../src/data/counties.json')
const districts = require('../src/data/districts.json')
const municipalities = require('../src/data/municipalities.json')
const submunicipalities = require('../src/data/submunicipalities.json')

describe('Locality', function () {
    describe('#getCounties()', function () {
        it('Should have the same length as counties.json array', function () {
            assert.strictEqual(locality.getCounties().length, counties.length)
        })
    })

    describe('#getDistricts()', function () {
        it('Should have the same length as districts.json array', function () {
            assert.strictEqual(locality.getDistricts().length, districts.flatMap(v => v.districts).length)
        })
    })

    describe('#getDistrictsByCounty()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getDistrictsByCounty('nord').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getDistrictsByCounty('lorem').length, 0)
        })
    })

    describe('#getMunicipalities()', function () {
        it('Should have the same length as municipalities.json array', function () {
            assert.strictEqual(locality.getMunicipalities().length, municipalities.flatMap(v => v.municipalities).length)
        })
    })

    describe('#getMunicipalitiesByDistrict()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getMunicipalitiesByDistrict('Corail').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getMunicipalitiesByDistrict('lorem').length, 0)
        })
    })

    describe('#getMunicipalitiesByCounty()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getMunicipalitiesByCounty('Nord').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getMunicipalitiesByCounty('lorem').length, 0)
        })
    })

    describe('#getSubMunicipalities()', function () {
        it('Should have the same length as submunicipalities.json array', function () {
            assert.strictEqual(locality.getSubMunicipalities().length, submunicipalities.flatMap(v => v.submunicipalities).length)
        })
    })

    describe('#getSubMunicipalitiesByMunicipality()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getSubMunicipalitiesByMunicipality('Dessalines').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getSubMunicipalitiesByMunicipality('lorem').length, 0)
        })
    })

    describe('#getSubMunicipalitiesByDistrict()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getSubMunicipalitiesByDistrict('Jerémie').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getSubMunicipalitiesByDistrict('lorem').length, 0)
        })
    })

    describe('#getSubMunicipalitiesByCounty()', function () {
        it('Should have length greather than 0', function () {
            assert.isAbove(locality.getSubMunicipalitiesByCounty('Nord').length, 0)
        })
        it('Should have length equal to 0', function () {
            assert.strictEqual(locality.getSubMunicipalitiesByCounty('lorem').length, 0)
        })
    })

    describe('#find()', function () {
        it('Find county', function () {
            assert.isOk(locality.find('sud').isCounty)
        })
        it('Find district', function () {
            assert.isOk(locality.find('Arcahaie').isDistrict)
        })
        it('Find municipality', function () {
            assert.isOk(locality.find('Beaumont').isMunicipality)
        })
        it('Find submunicipality', function () {
            assert.isOk(locality.find('Fosse Naboth').isSubmunicipality)
        })
    })
})
