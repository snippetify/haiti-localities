class Locality {
    constructor (
        county,
        district,
        municipality,
        submunicipality
    ) {
        this.county = county
        this.district = district
        this.municipality = municipality
        this.submunicipality = submunicipality
    }

    getCounties () {
        return this.county.getAll()
    }

    getDistricts () {
        return this.district.getAll()
    }

    getDistrictsByCounty (name) {
        return this.district.getByCounty(name)
    }

    getMunicipalities () {
        return this.municipality.getAll().map(v => ({ county: this.district.get(v.district).county, ...v }))
    }

    getMunicipalitiesByDistrict (name) {
        return this.municipality.getByDistrict(name).map(v => ({ county: this.district.get(v.district).county, ...v }))
    }

    getMunicipalitiesByCounty (name) {
        const items = []
        this.getDistrictsByCounty(name).forEach(v => {
            items.push(...this.municipality.getByDistrict(v.name).map(w => ({ county: v.county, ...w })))
        })
        return items
    }

    getSubMunicipalities () {
        return this.submunicipality
            .getAll()
            .map(v => {
                const muni = this.municipality.get(v.municipality)
                const district = this.district.get(muni.district)
                return {
                    county: district.county,
                    district: district.name,
                    ...v
                }
            })
    }

    getSubMunicipalitiesByMunicipality (name) {
        return this.submunicipality
            .getByMunicipality(name)
            .map(v => {
                const muni = this.municipality.get(v.municipality)
                const district = this.district.get(muni.district)
                return {
                    county: district.county,
                    district: district.name,
                    ...v
                }
            })
    }

    getSubMunicipalitiesByDistrict (name) {
        const items = []
        this.getMunicipalitiesByDistrict(name).forEach(v => {
            items.push(...this.submunicipality.getByMunicipality(v.name))
        })
        return items.map(v => {
            const muni = this.municipality.get(v.municipality)
            const district = this.district.get(muni.district)
            return {
                county: district.county,
                district: district.name,
                ...v
            }
        })
    }

    getSubMunicipalitiesByCounty (name) {
        const items = []
        this.getMunicipalitiesByCounty(name).forEach(v => {
            items.push(...this.submunicipality.getByMunicipality(v.name))
        })
        return items.map(v => {
            const muni = this.municipality.get(v.municipality)
            const district = this.district.get(muni.district)
            return {
                county: district.county,
                district: district.name,
                ...v
            }
        })
    }

    find (name) {
        if (this.county.has(name)) return { isCounty: true, ...this.county.get(name) }
        if (this.district.has(name)) {
            const item = this.district.get(name)
            return {
                isDistrict: true,
                ...item
            }
        }
        if (this.municipality.has(name)) {
            const item = this.municipality.get(name)
            const dist = this.district.get(item.district)
            return {
                county: dist.county,
                isMunicipality: true,
                ...item
            }
        }
        if (this.submunicipality.has(name)) {
            const item = this.submunicipality.get(name)
            const muni = this.municipality.get(item.municipality)
            const dist = this.district.get(muni.district)
            return {
                county: dist.county,
                district: muni.district,
                isSubmunicipality: true,
                ...item
            }
        }
    }
}

module.exports = new Locality(
    require('./County'),
    require('./District'),
    require('./Municipality'),
    require('./SubMunicipality')
)
