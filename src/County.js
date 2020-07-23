import normalize from './normalize'
import counties from './data/counties.json'

// Departement
class County {

    has (name) {
        return counties.map(v => v.name.toLowerCase()).includes(normalize(name))
    }

    get (name) {
        if (!this.has(name)) return undefined
        return counties.find(v => v.name.toLowerCase() === normalize(name))
    }

    getAll () {
        return counties
    }
}

export default new County()