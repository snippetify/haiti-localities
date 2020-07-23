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
        const items = []
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
        const items = []
        this.getMunicipalitiesByDistrict(name).forEach(v => {
            items.concat(submunicipality.getByMunicipality(v))
        })
        return items
    }

    getSubMunicipalitiesByCounty (name) {
        const items = []
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
            const dist = district.get(item.district)
            return {
                county: dist.county,
                district: item.county,
                ...item.municipalities.find(v => normalize(v.name) === normalize(name))
            }
        }
        if (submunicipality.has(name)) {
            const item = submunicipality.get(name)
            const muni = municipality.get(item.municipality)
            const dist = district.get(muni.district)
            return {
                county: dist.county,
                district: muni.county,
                municipality: item.municipality,
                ...item.submunicipalities.find(v => normalize(v.name) === normalize(name))
            }
        }
        return undefined
    }
}

export default new Locality()
