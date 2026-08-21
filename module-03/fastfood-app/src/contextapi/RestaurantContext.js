import { createContext, useContext } from "react";

export const RestaurantContext = createContext();

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useRestaurant must be used within a RestaurantProvider");
    }
    return context;
};
