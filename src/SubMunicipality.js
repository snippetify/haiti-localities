import normalize from './normalize'
import submunicipalities from './data/submunicipalities.json'

// Section communale
class SubMunicipality {
    has (name) {
        return submunicipalities.filter(v => v.submunicipalities.map(w => w.name.toLowerCase()).includes(normalize(name))).length > 0
    }

    hasMunicipality (name) {
        return submunicipalities.map(v => v.municipality.toLowerCase()).includes(normalize(name))
    }

    getByMunicipality (name) {
        if (!this.hasMunicipality(name)) return undefined
        return submunicipalities.find(v => v.municipality.toLowerCase() === normalize(name)).submunicipalities
    }

    get (name) {
        if (!this.has(name)) return undefined
        return submunicipalities.filter(v => v.submunicipalities.find(w => w.name.toLowerCase() === normalize(name)))
    }

    getAll () {
        return submunicipalities
    }
}

export default new SubMunicipality()
