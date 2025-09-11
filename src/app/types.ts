// Type definitions
export type CarDetails = {
  name: string;
  type: string;
  price: number;
  discountedPrice?: number;
  people: number;
  fuel: string;
  transmission: string;
  isLiked?: boolean;
};
export type CarType = {
  name: string;
  count: number;
};

export type Capacity = {
  name: string;
  count: number;
};
