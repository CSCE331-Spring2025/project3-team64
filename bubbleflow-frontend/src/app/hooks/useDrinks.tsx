import { useState, useCallback } from "react";
import { drinkService } from "../service/drinkService";
import { Drink, DrinkCategory, DrinkRequest } from "../service/types";

export const useDrinks = () => {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDrinks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await drinkService.getDrinks();
            setDrinks(data);
        }
        catch(err) {
            setError('failed to fetch drinks');
            console.error(err);
        }
        finally {
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
        try {
            const data = await drinkService.getDrinkCategories();
            setDrinkCategories(data);
        }
        catch(err) {
            setError('failed to fetch categories');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        drinkCategories,
        loading,
        error,
        fetchDrinkCategories
    };
};

export const useAddDrink = () => {
    const addDrink = async (drinkRequest: DrinkRequest) => {
    try{
        return await drinkService.addDrink(drinkRequest as any);
    }
    catch(error){
        console.error('Error adding drink:', error);
        throw error;
      }
    };
    
    return { addDrink };
  };

export const useUpdateDrink = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateDrink = useCallback(async (drink: Drink) => {
        setLoading(true);
        setError(null);
        try {
            await drinkService.updateDrink(drink);
        }
        catch(err) {
            setError('failed to update drink');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        updateDrink
    };
}

export const useDeleteDrink = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteDrink = async (drink: Drink) => {
        setLoading(true);
        setError(null);
        try {
            console.log("Sending drink to delete:", drink);
            await drinkService.deleteDrink(drink);
        }
        catch(err) {
            setError('failed to delete drink');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        deleteDrink
    };
}