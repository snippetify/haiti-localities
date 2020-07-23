import normalize from './normalize'
import districts from './data/districts.json'

// Arrondissement
class District {

    has (name) {
        return districts.filter(v => v.districts.map(w => w.name.toLowerCase()).includes(normalize(name))).length > 0
    }

    hasCounty (name) {
        return districts.map(v => v.county.toLowerCase()).includes(normalize(name))
    }

    getByCounty (name) {
        if (!this.hasCounty(name)) return undefined
        return districts.find(v => v.county.toLowerCase() === normalize(name)).districts
    }

    get (name) {
        if (!this.has(name)) return undefined
        return districts.filter(v => v.districts.find(w => w.name.toLowerCase() === normalize(name)))
    }

    getAll () {
        return districts
    }
}

export default new District()