import county from './County'
import district from './District'
import municipality from './Municipality'
import submunicipality from './SubMunicipality'
import normalize from './normalize'

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

    find (name) {
        if (county.has(name)) return county.get(name)
        if (district.has(name)) {
            const item = district.get(name)
            return {
                county: item.county,
                ...item.districts.find(v => normalize(v.name) === normalize(name))
            }
        }
        if (municipality.has(name)) {
            const item = municipality.get(name)
            const district = district.get(item.district)
            return {
                county: district.county,
                district: item.county,
                ...item.municipalities.find(v => normalize(v.name) === normalize(name))
            }
        }
        if (submunicipality.has(name)) {
            const item = submunicipality.get(name)
            const municipality = municipality.get(item.municipality)
            const district = district.get(municipality.district)
            return {
                county: district.county,
                district: municipality.county,
                municipality: item.municipality,
                ...item.submunicipalities.find(v => normalize(v.name) === normalize(name))
            }
        }
        return
    }
}

export default new Locality();