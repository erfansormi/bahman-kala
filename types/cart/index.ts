export interface CartActionResponse {
  success: boolean;
  message: string;
  user: User;
}

interface User {
  activities: Activities;
  cart: Cart;
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  addresses: Address[];
  orders: Order[];
  comments: any[];
  __v: number;
  photo: string;
  birth_date: string;
  favorites_list: FavoritesList[];
}

interface Activities {
  recent_visits: RecentVisit[];
}

interface RecentVisit {
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

interface Rating {
  rate: number;
  count: number;
}

interface Seller {
  seller: string;
  variants: Variant[];
  _id: string;
}

interface Variant {
  available: boolean;
  price: number;
  colors: string[];
  _id: string;
  old_price?: number;
  discount_percentage?: number;
  size?: string;
}

interface Attribute {
  name: string;
  value: string;
  _id: string;
}

interface Comment {
  user: User2;
  rate: number;
  comment_text: string;
  is_suggest: string;
  is_buyer: boolean;
  created_at: string;
  _id: string;
  title?: string;
}

interface User2 {
  unknown: boolean;
  userId: string;
}

export interface Cart {
  products: Product[];
  products_counts: number;
  products_prices: number;
  total_prices_cart: number;
  total_profit: number;
  total_profit_percentage: number;
}

interface Product {
  product: Product2;
  variant: Variant3;
  seller: Seller3;
  _id: string;
}

interface Product2 {
  rating: Rating2;
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sellers: Seller2[];
  attributes: Attribute2[];
  comments: Comment2[];
  slug: string;
  __v: number;
  created_at: number;
}

interface Rating2 {
  rate: number;
  count: number;
}

interface Seller2 {
  seller: string;
  variants: Variant2[];
  _id: string;
}

interface Variant2 {
  available: boolean;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  colors: string[];
  size: string;
  _id: string;
}

interface Attribute2 {
  name: string;
  value: string;
  _id: string;
}

interface Comment2 {
  user: User3;
  rate: number;
  comment_text: string;
  is_suggest: string;
  created_at: string;
  _id: string;
  title?: string;
  is_buyer: boolean;
}

interface User3 {
  unknown: boolean;
  userId: string;
}

interface Variant3 {
  color: string;
  size: string;
  price: number;
  _id: string;
  quantity: number;
}

interface Seller3 {
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

interface Address {
  postal_address: string;
  province: string;
  city: string;
  plaque: string;
  unit: string;
  postal_code: string;
  coordinates: number[];
  _id: string;
}

interface Order {
  address: string;
  products: Product3[];
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

interface Product3 {
  variant: Variant4;
  product: Product4;
  seller: Seller5;
  _id: string;
}

interface Variant4 {
  color: string;
  size?: string;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  _id: string;
  quantity: number;
}

interface Product4 {
  rating: Rating3;
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sellers: Seller4[];
  attributes: Attribute3[];
  comments: Comment3[];
  slug: string;
  __v: number;
  created_at: number;
}

interface Rating3 {
  rate: number;
  count: number;
}

interface Seller4 {
  seller: string;
  variants: Variant5[];
  _id: string;
}

interface Variant5 {
  available: boolean;
  price: number;
  old_price?: number;
  discount_percentage?: number;
  colors: string[];
  _id: string;
  size?: string;
}

interface Attribute3 {
  name: string;
  value: string;
  _id: string;
}

interface Comment3 {
  user: User4;
  rate: number;
  comment_text: string;
  is_buyer: boolean;
  created_at: string;
  _id: string;
  is_suggest: string;
  title?: string;
}

interface User4 {
  unknown: boolean;
  userId: string;
}

interface Seller5 {
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

interface FavoritesList {
  rating: Rating4;
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  sellers: Seller6[];
  attributes: Attribute4[];
  comments: Comment4[];
  slug: string;
  __v: number;
  created_at: number;
}

interface Rating4 {
  rate: number;
  count: number;
}

interface Seller6 {
  seller: string;
  variants: Variant6[];
  _id: string;
}

interface Variant6 {
  available: boolean;
  price: number;
  colors: string[];
  _id: string;
  old_price?: number;
  discount_percentage?: number;
  size?: string;
}

interface Attribute4 {
  name: string;
  value: string;
  _id: string;
}

interface Comment4 {
  user: User5;
  title: string;
  rate: number;
  comment_text: string;
  is_suggest: string;
  is_buyer: boolean;
  created_at: string;
  _id: string;
}

interface User5 {
  unknown: boolean;
  userId: string;
}
