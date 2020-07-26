// French API
class Localites {
    constructor (locality) {
        this.locality = locality
    }

    getDepartements () {
        return this.locality.getCounties()
    }

    getArrondissements () {
        return this.locality.getDistricts()
    }

    getArrondissementsByDepartement (name) {
        return this.locality.getDistrictsByCounty(name)
    }

    getCommunes () {
        return this.locality.getMunicipalities()
    }

    getCommunesByArrondissement (name) {
        return this.locality.getMunicipalitiesByDistrict(name)
    }

    getCommunesByDepartement (name) {
        return this.locality.getMunicipalitiesByCounty(name)
    }

    getSectionCommunales () {
        return this.locality.getSubMunicipalities()
    }

    getSectionCommunalesByCommune (name) {
        return this.locality.getSubMunicipalitiesByMunicipality(name)
    }

    getSectionCommunalesByArrondissement (name) {
        return this.locality.getSubMunicipalitiesByDistrict(name)
    }

    getSectionCommunalesByDepartements (name) {
        return this.locality.getSubMunicipalitiesByCounty(name)
    }

    find (name) {
        return this.locality.find(name)
    }
}

module.exports = new Localites(require('./Locality'))
