export interface MainPageResponse {
    success: boolean
    most_discount: Product[]
    cheapest: Product[]
    highest_rate: Product[]
}

export interface Product {
    rating: Rating
    _id: string
    title: string
    category: string
    description: string
    image: string
    sellers: Seller[]
    attributes: Attribute[]
    comments: Comment[]
    slug: string
    __v: number
    created_at: number
}

export interface Rating {
    rate: number
    count: number
}

export interface Seller {
    seller: string
    variants: Variant[]
    _id: string
}

export interface Variant {
    available: boolean
    price: number
    old_price?: number
    discount_percentage?: number
    colors: string[]
    size?: string
    _id: string
}

export interface Attribute {
    name: string
    value: string
    _id: string
}

export interface Comment {
    user: UserComment
    rate: number
    comment_text: string
    is_suggest: string
    created_at: string
    _id: string
    title?: string
    is_buyer: boolean
}

export interface UserComment {
    unknown: boolean
    userId: string
}