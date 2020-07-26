const normalize = require('./utils').normalize

// Arrondissement
class District {
    constructor (data) {
        this.districts = data
    }

    has (name) {
        return this.districts.filter(v => this.findItem(v.districts, name)).length > 0
    }

    hasCounty (name) {
        return this.districts.map(v => normalize(v.county)).includes(normalize(name))
    }

    getByCounty (name) {
        if (!this.hasCounty(name)) return []
        return this.districts
            .find(v => normalize(v.county) === normalize(name))
            .districts
            .map(v => ({ county: name, ...v }))
    }

    get (name) {
        if (!this.has(name)) return
        const item = this.districts.find(v => this.findItem(v.districts, name))
        return {
            county: item.county,
            ...this.findItem(item.districts, name)
        }
    }

    getAll () {
        return this.districts.flatMap(v => v.districts.map(w => ({ county: v.county, ...w })))
    }

    findItem (items, name) {
        return items.find(v => normalize(v.name) === normalize(name) || v.aliases.map(a => normalize(a)).includes(normalize(name)))
    }
}

module.exports = new District(require('./data/districts.json'))
