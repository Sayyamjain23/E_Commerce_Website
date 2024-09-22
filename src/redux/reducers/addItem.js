const addItem = [];

const addItems = (state = addItem, action) => {
    switch (action.type) {
        case "ADDITEM":
            // Check if the item already exists in the cart
            const exist = state.find((x) => x.id === action.payload.id);

            if (exist) {
                // Update the quantity if the item already exists
                return state.map((x) =>
                    x.id === action.payload.id
                        ? { ...x, quantity: x.quantity + action.payload.quantity } // Increment quantity
                        : x
                );
                
            } else {
                // Add new item with its quantity
                return [
                    ...state,
                    {
                        ...action.payload,
                        quantity: action.payload.quantity || 1, // Default to 1 if quantity is not provided
                    },
                ];
                
            }
        
        case "DELITEM":
            return state.filter((x) => x.id !== action.payload.id);

        default:
            return state;
    }
};

export default addItems;
