import { Product, Rating, Seller } from "../main-page";

export interface User {
  activities: Activities;
  cart: Cart;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at: string;
  addresses: Address[];
  orders: Order[];
  comments: Comment[];
  __v: number;
  photo: string;
  birth_date: string;
  favorites_list: FavoritesList[];
}

export interface Activities {
  recent_visits: RecentVisit[];
}

export interface RecentVisit {
  rating: Rating;
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sellers: Seller[];
  attributes: Attribute[];
  comments: Comment[];
  slug: string;
  __v: number;
  created_at: number;
}

export interface SellerVariant {
  available: boolean;
  price: number;
  colors: string[];
  _id: string;
  old_price?: number;
  discount_percentage?: number;
  size?: string;
}

export interface Attribute {
  name: string;
  value: string;
  _id: string;
}

export interface Comment {
  user: UserComment;
  title?: string;
  rate: number;
  comment_text: string;
  is_suggest: string;
  is_buyer: boolean;
  created_at: string;
  _id: string;
}

export interface UserComment {
  unknown: boolean;
  userId: string;
}

export interface Cart {
  products: ProductData[];
  products_counts: number;
  products_prices: number;
  total_prices_cart: number;
  total_profit: number;
  total_profit_percentage: number;
}

export interface Address {
  postal_address: string;
  province: string;
  city: string;
  plaque: string;
  unit: string;
  postal_code: string;
  coordinates: number[];
  _id: string;
}

export interface Order {
  address: string;
  products: ProductData[];
  payment_type: string;
  shipping_cost: number;
  order_date: string;
  delivery_date: string;
  products_counts: number;
  products_prices: number;
  total_prices_cart: number;
  total_profit: number;
  total_profit_percentage: number;
  _id: string;
}

export interface ProductData {
  variant: ProductVariant;
  product: Product;
  seller: SellerInfo;
  _id: string;
}

export interface ProductVariant {
  color: string;
  size?: string;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  _id: string;
  quantity: number;
}

export interface SellerInfo {
  _id: string;
  shop_name: string;
  email: string;
  phone: string;
  performance: string;
  satisfaction_percentage: number;
  about: string;
  products: string[];
  created_at: string;
  slug: string;
  __v: number;
}

export interface FavoritesList {
  rating: Rating;
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sellers: Seller[];
  attributes: Attribute[];
  comments: Comment[];
  slug: string;
  __v: number;
  created_at: number;
}
