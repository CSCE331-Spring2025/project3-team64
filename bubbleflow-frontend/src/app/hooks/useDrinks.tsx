import { useState, useCallback} from "react";
import api from "../service/api";
import { Drink, DrinkCategory } from "../service/types";

export const useDrinks = () => {
    const [drinks, setDrinks ] = useState<Drink[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchDrinks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await api.get<Drink[]>('drinks');
            setDrinks(response.data);
        }
        catch(err){
            setError('failed to fetch drinks');
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }, []);

    return {
        drinks,
        loading,
        error,
        fetchDrinks
    };
};


export const useDrinkCategories = () => {
    const [drinkCategories, setDrinkCategories] = useState<DrinkCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDrinkCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await api.get<DrinkCategory[]>('drink-categories');
            setDrinkCategories(response.data);
        }
        catch(err){
            setError('failed to fetch categories');
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }, []);


    return {
        drinkCategories,
        loading,
        error,
        fetchDrinkCategories
    };

}