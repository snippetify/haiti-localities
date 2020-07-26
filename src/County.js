const normalize = require('./utils').normalize

// Departement
class County {
    constructor (data) {
        this.counties = data
    }

    has (name) {
        return this.counties.map(v => normalize(v.name)).includes(normalize(name))
    }

    get (name) {
        if (!this.has(name)) return
        return this.counties.find(v => normalize(v.name) === normalize(name))
    }

    getAll () {
        return this.counties
    }
}

module.exports = new County(require('./data/counties.json'))
