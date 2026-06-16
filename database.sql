-- 1. (products)
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price BIGINT NOT NULL,
    old_price BIGINT DEFAULT NULL,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    label_text TEXT,
    label_variant TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc' :: text, now())
);

-- 2. (posts)
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    image_url TEXT,
    read_time INT DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc' :: text, now())
);

-- 3.  (orders)
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    delivery_address TEXT,
    total_price BIGINT NOT NULL,
    status TEXT DEFAULT 'pending',
    -- pending, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc' :: text, now())
);

-- 4.  (order_items) 
CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase BIGINT NOT NULL
);