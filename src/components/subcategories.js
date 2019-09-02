import axios from 'axios';

const SUBCATEGORIES_URL = process.env.REACT_APP_API_URL + 'subcategories'

class SubcategoryAPI {

    // Subcategory IDs
    static extraVirginOliveOilID = 1;
    static virginOliveOilID = 2;
    static lampanteOliveOilID = 3;
    static redWineID = 4;
    static whiteWineID = 5;
    static shellRiceID = 6;
    static barleyFeedID = 7;
    static softBreadWheatID = 8;

    // Measures
    static measures = {
        tonelade: '(€/T)',
        hectolitre: '(€/hl)'
    }

    // Subcategories
    static subcategories = [
        {
            id: this.extraVirginOliveOilID,
            name: 'extra-virgin-olive-oil',
            measure: this.measures['tonelade']
        },
        {
            id: this.virginOliveOilID,
            name: 'virgin-olive-oil',
            measure: this.measures['tonelade']
        },
        {
            id: this.lampanteOliveOilID,
            name: 'lampante-olive-oil',
            measure: this.measures['tonelade']
        },
        {
            id: this.redWineID,
            name: 'red-wine',
            measure: this.measures['hectolitre']
        },
        {
            id: this.whiteWineID,
            name: 'white-wine',
            measure: this.measures['hectolitre']
        },
        {
            id: this.shellRiceID,
            name: 'shell-rice',
            measure: this.measures['tonelade']
        },
        {
            id: this.barleyFeedID,
            name: 'barley-feed',
            measure: this.measures['tonelade']
        },
        {
            id: this.softBreadWheatID,
            name: 'soft-bread-wheat',
            measure: this.measures['tonelade']
        },
    ]
    
    constructor(subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    getResponseBySubcategoryId() {
        return axios.get(`${SUBCATEGORIES_URL}/${this.subcategoryId}/dataprice_by_subcategory/`)
    }
}

export default SubcategoryAPI;