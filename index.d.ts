
export interface LocalityInterface {
    getCounties (): any[];
    getDistricts (): any[];
    getDistrictsByCounty (value: string): any[];
    getMunicipalities (): any[];
    getMunicipalitiesByDistrict (value: string): any[];
    getMunicipalitiesByCounty (value: string): any[];
    getSubMunicipalities (): any[];
    getSubMunicipalitiesByMunicipality (value: string): any[];
    getSubMunicipalitiesByDistrict (value: string): any[];
    getSubMunicipalitiesByCounty (value: string): any[];
    find (value: string): any;
}

declare const Locality: LocalityInterface;

export default Locality;