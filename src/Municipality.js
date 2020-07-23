import normalize from './normalize'
import municipalities from './data/municipalities.json'

// Commune
class Municipality {
    has (name) {
        return municipalities.filter(v => v.municipalities.map(w => w.name.toLowerCase()).includes(normalize(name))).length > 0
    }

    hasDistrict (name) {
        return municipalities.map(v => v.district.toLowerCase()).includes(normalize(name))
    }

    getByDistrict (name) {
        if (!this.hasDistrict(name)) return undefined
        return municipalities.find(v => v.district.toLowerCase() === normalize(name)).municipalities
    }

    get (name) {
        if (!this.has(name)) return undefined
        return municipalities.filter(v => v.municipalities.find(w => w.name.toLowerCase() === normalize(name)))
    }

    getAll () {
        return municipalities
    }
}

export default new Municipality()
