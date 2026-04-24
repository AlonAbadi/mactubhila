-- Migration 025: Add cards_149 to product_type enum
ALTER TYPE product_type ADD VALUE IF NOT EXISTS 'cards_149';
