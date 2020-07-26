const normalize = require('./utils').normalize

// Section communale
class SubMunicipality {
    constructor (data) {
        this.submunicipalities = data
    }

    has (name) {
        return this.submunicipalities.filter(v => this.findItem(v.submunicipalities, name)).length > 0
    }

    hasMunicipality (name) {
        return this.submunicipalities.map(v => normalize(v.municipality)).includes(normalize(name))
    }

    getByMunicipality (name) {
        if (!this.hasMunicipality(name)) return []
        return this.submunicipalities
            .find(v => normalize(v.municipality) === normalize(name))
            .submunicipalities
            .map(v => ({ municipality: name, ...v }))
    }

    get (name) {
        if (!this.has(name)) return
        const item = this.submunicipalities.find(v => this.findItem(v.submunicipalities, name))
        return {
            municipality: item.municipality,
            ...this.findItem(item.submunicipalities, name)
        }
    }

    getAll () {
        return this.submunicipalities.flatMap(v => v.submunicipalities.map(w => ({ municipality: v.municipality, ...w })))
    }

    findItem (items, name) {
        return items.find(v => normalize(v.name) === normalize(name) || v.aliases.map(a => normalize(a)).includes(normalize(name)))
    }
}

module.exports = new SubMunicipality(require('./data/submunicipalities.json'))
