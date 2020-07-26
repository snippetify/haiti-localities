const normalize = require('./utils').normalize

// Commune
class Municipality {
    constructor (data) {
        this.municipalities = data
    }

    has (name) {
        return this.municipalities.filter(v => this.findItem(v.municipalities, name)).length > 0
    }

    hasDistrict (name) {
        return this.municipalities.map(v => normalize(v.district)).includes(normalize(name))
    }

    getByDistrict (name) {
        if (!this.hasDistrict(name)) return []
        return this.municipalities
            .find(v => normalize(v.district) === normalize(name))
            .municipalities
            .map(v => ({ district: name, ...v }))
    }

    get (name) {
        if (!this.has(name)) return
        const item = this.municipalities.find(v => this.findItem(v.municipalities, name))
        return {
            district: item.district,
            ...this.findItem(item.municipalities, name)
        }
    }

    getAll () {
        return this.municipalities.flatMap(v => v.municipalities.map(w => ({ district: v.district, ...w })))
    }

    findItem (items, name) {
        return items.find(v => normalize(v.name) === normalize(name) || v.aliases.map(a => normalize(a)).includes(normalize(name)))
    }
}

module.exports = new Municipality(require('./data/municipalities.json'))
