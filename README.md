# Haiti localities

This module exposes a public API for Haiti's localities. You can search, filter or list localities by **county**, **district**, **municipality** and **submunicipality**.

Cette librairie expose une API publique pour les localités d'Haïti. Vous pouvez rechercher, filtrer ou lister toutes les localités par **département**, **arrondissement**, **commune** et **section communale**.

## About Snippetify

Snippetify is a community snippets warehouse but also a suite of tools that allow you to exploit these snippets.

- Save your snippets to the cloud
- Search snippets
- Deep searching (search for snippets all over the web)
- Share your snippets
- Embed snippets in your forum or blog
- Organize your snippets with tags
- Contribute on snippets of others
- Enhance your snippets by receiving votes and comments
- Make coding fun by challenging your friends
- Work on your notoriety by publishing good snippets which will allow you to receive stars, badges and privileges

[snippetify.com](https://snippetify.com)

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install @snippetify/haiti-localities
```

In a browser:

```html
<script src="node_modules/@snippetify/haiti-localities/dist/haiti-localities.js"></script>
```

In [Node.js](https://nodejs.org/):

```js
const haitiLocalities = require("@snippetify/haiti-localities")
```

## API

### `haitiLocalities.getCounties()`

Return an array of counties(départements)

```javascript
const items = haitiLocalities.getCounties()
console.log(JSON.stringify(items))
// [
//     {
//         "map_id": 1,
//         "area": 4987,
//         "density": 350,
//         "region": "Centre",
//         "name": "Artibonite",
//         "capital": "Gonaïves",
//         "population": 1727524
//     },
//     {
//         "map_id": 2,
//         "area": 3487,
//         "density": 210,
//         "region": "Centre",
//         "name": "Centre",
//         "capital": "Hinche",
//         "population": 746236
//     },
//     ...
// ]
```

### `haitiLocalities.getDistricts()`

Return an array of districts(arrondissements)

```javascript
const items = haitiLocalities.getDistricts()
console.log(JSON.stringify(items))
// [
//     { county: 'Artibonite', name: 'Dessalines', aliases: [] },
//     { county: 'Artibonite', name: 'Gonaïves', aliases: [] },
//     { county: 'Artibonite', name: 'Gros Morne', aliases: [] },
//     ...
// ]
```

### `haitiLocalities.getDistrictsByCounty(string)`

Return an array of districts(arrondissements) for a county.

### `haitiLocalities.getMunicipalities()`

Return an array of municipalities(communes)

```javascript
const items = haitiLocalities.getMunicipalities()
console.log(JSON.stringify(items))
// [
//     {
//         county: 'Ouest',
//         district: 'Arcahaie',
//         name: 'Arcahaie',
//         aliases: []
//       },
//       {
//         county: 'Ouest',
//         district: 'Arcahaie',
//         name: 'Cabaret',
//         aliases: []
//       },
//     ...
// ]
```

### `haitiLocalities.getMunicipalitiesByDistrict(string)`

Return an array of municipalities(communes) for a district.

### `haitiLocalities.getMunicipalitiesByCounty(string)`

Return an array of municipalities(communes) for a county.

### `haitiLocalities.getSubMunicipalities()`

Return an array of submunicipalities(sections communales)

```javascript
const items = haitiLocalities.getSubMunicipalities()
console.log(JSON.stringify(items))
// [
//     {
//         county: 'Centre',
//         district: 'Mirebalais',
//         municipality: "Saut d'Eau",
//         name: 'Montagne Terrible',
//         aliases: [],
//         postal_code: 'HT0000'
//       },
//       {
//         county: "Grand'Anse",
//         district: "Anse d'Hainault",
//         municipality: "Anse d'Hainault",
//         name: 'Grandoit',
//         aliases: [],
//         postal_code: 'HT0000'
//       },
//     ...
// ]
```

### `haitiLocalities.getSubMunicipalitiesByMunicipality(string)`

Return an array of submunicipalities(sections communales) for a municipality.

### `haitiLocalities.getSubMunicipalitiesByDistrict(string)`

Return an array of submunicipalities(sections communales) for a district.

### `haitiLocalities.getSubMunicipalitiesByCounty(string)`

Return an array of submunicipalities(sections communales) for a county.

### `haitiLocalities.find(string)`

Return any county, district, municipality or submunicipality that matches the string.

## Changelog

Please see [CHANGELOG](https://github.com/snippetify/haiti-localities/blob/master/CHANGELOG.md) for more information what has changed recently.

## Testing

```bash
npm test
```

## Contributing

Please see [CONTRIBUTING](https://github.com/snippetify/haiti-localities/blob/master/CONTRIBUTING.md) for details.

## Credits

1. [Evens Pierre](https://github.com/pierrevensy)

## License

The MIT License (MIT). Please see [License File](https://github.com/snippetify/haiti-localities/blob/master/LICENSE.md) for more information.
