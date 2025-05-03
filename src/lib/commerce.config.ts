// Commerce configuration for the project
// This defines which commerce provider to use and its settings

export type CommerceConfig = {
  provider: string;
  features: {
    cart: boolean;
    search: boolean;
    wishlist: boolean;
    customerAuth: boolean;
    customCheckout: boolean;
  };
};

// Default provider is 'shopify' but can be changed as needed
const commerceConfig: CommerceConfig = {
  provider: 'custom', // Using 'custom' for our own implementation
  features: {
    cart: true,
    search: true,
    wishlist: true, 
    customerAuth: false, // Will implement later
    customCheckout: true,
  },
};

export default commerceConfig; 