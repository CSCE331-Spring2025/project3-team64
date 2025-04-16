import api from './api';
import { Drink, DrinkCategory } from './types';

export const drinkService = {

    // drinks endpoints
    getDrinks: () => {
        return api.get<Drink[]>('/drinks').then(res => res.data);
    },

    deleteDrink: (drink: Drink) => {
        return api.post<Drink>('/drinks/deleteDrink', drink).then(res => res.data);
    },

    addDrink: (drink: Drink) => {
        return api.post<Drink>('/drinks/addDrink', drink).then(res => res.data);
    },

    updateDrink: (drink: Drink) => {
        return api.post<Drink>('/drinks/updateDrink', drink).then(res => res.data);
    },


    //drinkcategories endpoints
    
    getDrinkCategories : () => {
        return api.get<DrinkCategory[]>('/drink-categories').then(res => res.data);
    }


}