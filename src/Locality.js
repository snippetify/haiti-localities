import county from './County'
import district from './District'
import municipality from './Municipality'
import submunicipality from './SubMunicipality'

class Locality {

    getCounties () {
        return county.getAll()
    }

    getDistricts () {
        return district.getAll()
    }

    getDistrictsByCounty (name) {
        return district.getByCounty(name)
    }

    getMunicipalities () {
        return municipality.getAll()
    }

    getMunicipalitiesByDistrict (name) {
        return municipality.getByDistrict(name)
    }

    getMunicipalitiesByCounty (name) {
        let items = []
        this.getDistrictsByCounty(name).forEach(v => {
            items.concat(municipality.getByDistrict(v))
        })
        return items
    }

    getSubMunicipalities () {
        return submunicipality.getAll()
    }

    getSubMunicipalitiesByMunicipality (name) {
        return submunicipality.getByMunicipality(name)
    }

    getSubMunicipalitiesByDistrict (name) {
        let items = []
        this.getMunicipalitiesByDistrict(name).forEach(v => {
            items.concat(submunicipality.getByMunicipality(v))
        })
        return items
    }

    getSubMunicipalitiesByCounty (name) {
        let items = []
        this.getMunicipalitiesByCounty(name).forEach(v => {
            items.concat(submunicipality.getByMunicipality(v))
        })
        return items
    }
}

export default new Locality();