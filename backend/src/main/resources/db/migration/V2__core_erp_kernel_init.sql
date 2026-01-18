/*
You are a veteran accountant, database pro and a senior developer.
check this flyway file for me.
it's a schema for an MVP of a small-scale erp-lite for pop-up store agencies.
It will remain small in scale and scope. focus on checking the logic not adding features.
ready to see if anything is faulty or potentially problematic?
*/

/*
  FLYWAY V2 MIGRATION
  MySQL 8.0.x or above
  Project: ERP-Lite (Pop-up Store Edition)
  Contents: Core Entities + Hidden Ledger for double entry bookkeeping + necessary tables for erp
*/

-- ==========================================
-- 1. INDEPENDENT ENTITIES
-- ==========================================

-- 1.1 Locations (Physical Places)
CREATE TABLE location (
                          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          type ENUM('warehouse', 'popup', 'inventory_loss', 'virtual') NOT NULL,
                          address VARCHAR(255),
                          is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 1.2 Partners (Customers & Suppliers)
CREATE TABLE partner (
                         id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         email VARCHAR(255),
                         phone VARCHAR(50),
                         is_customer TINYINT(1) DEFAULT 1,
                         is_supplier TINYINT(1) DEFAULT 0,
                         is_active TINYINT(1) DEFAULT 1,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 1.3 Brands (The Vendors)
CREATE TABLE brand (
                       id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255) NOT NULL,
                       commission_rate DECIMAL(5, 4) DEFAULT 0.00, -- commission rate tied to brand for simplicity
                       contact_email VARCHAR(255),
                       is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 1.4 Chart of Accounts (Hidden Ledger)
CREATE TABLE account_account (
                                 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                 code VARCHAR(20) NOT NULL UNIQUE,
                                 name VARCHAR(100) NOT NULL,
                                 type ENUM('asset', 'liability', 'equity', 'revenue', 'expense') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================
-- 2. DEPENDENT ENTITIES
-- ==========================================

-- 2.1 Products & Users
CREATE TABLE product (
                         id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                         brand_id BIGINT UNSIGNED NOT NULL,

                         sku VARCHAR(50) NOT NULL UNIQUE,
                         name VARCHAR(255) NOT NULL,
                         category VARCHAR(100),
                         version INT DEFAULT 0,

    -- Financials for Ledger
                         price DECIMAL(19, 4) NOT NULL DEFAULT 0.00,
                         cost DECIMAL(19, 4) NOT NULL DEFAULT 0.00,

                         is_active TINYINT(1) DEFAULT 1,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT chk_price_pos CHECK (price >= 0),
                         CONSTRAINT fk_product_brand FOREIGN KEY (brand_id) REFERENCES brand(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2.2 Popup Stores (Management Layer)
CREATE TABLE popup_store (
                             id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             location_id BIGINT UNSIGNED NOT NULL,

                             name VARCHAR(255) NOT NULL,
                             start_date DATE,
                             end_date DATE,
                             status ENUM('planned', 'operating', 'closed') DEFAULT 'planned',
                             target_revenue DECIMAL(19, 4),

                             CONSTRAINT fk_popup_location FOREIGN KEY (location_id) REFERENCES location(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2.3 System Users (Authentication & Scoping)
CREATE TABLE sys_user (
                          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    -- Auth Credentials
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password_hash VARCHAR(255) NOT NULL, -- Store BCrypt/Argon2 hashes, NEVER plain text
                          full_name VARCHAR(100) NOT NULL,

    -- Role Definition
                          role ENUM('super_admin', 'manager', 'staff') NOT NULL,

    -- SCOPING: These fields determine WHAT the user can see
    -- If role='manager', they can have brand_ids.
    -- If role='staff', they usually need a default_popup_store_id for fast login.
                          brand_id BIGINT UNSIGNED NULL,
                          default_popup_store_id BIGINT UNSIGNED NULL,

                          is_active TINYINT(1) DEFAULT 1,
                          last_login DATETIME,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_user_brand FOREIGN KEY (brand_id) REFERENCES brand(id) ON DELETE SET NULL,
                          CONSTRAINT fk_user_popup FOREIGN KEY (default_popup_store_id) REFERENCES popup_store(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ==========================================
-- 3. INVENTORY & REQUESTS
-- ==========================================

-- 3.1 Stock Request (Header)
-- only 1 warehouse
CREATE TABLE stock_request (
                               id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                               popup_store_id BIGINT UNSIGNED NOT NULL,
                               location_src_id BIGINT UNSIGNED NOT NULL,
                               status ENUM('requested', 'approved', 'rejected') DEFAULT 'requested',
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT fk_req_popup FOREIGN KEY (popup_store_id) REFERENCES popup_store(id),
                               CONSTRAINT fk_req_location_src FOREIGN KEY (location_src_id) REFERENCES location(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3.1.1 Stock Request Lines (Details)
CREATE TABLE stock_request_line (
                                    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                    request_id BIGINT UNSIGNED NOT NULL,
                                    product_id BIGINT UNSIGNED NOT NULL,
                                    qty DECIMAL(19, 4) NOT NULL,
                                    CONSTRAINT fk_reql_req FOREIGN KEY (request_id) REFERENCES stock_request(id),
                                    CONSTRAINT fk_reql_prod FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3.2 Stock Move (The Immutable Ledger)
CREATE TABLE stock_move (
                            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

                            product_id BIGINT UNSIGNED NOT NULL,
                            location_src_id BIGINT UNSIGNED NOT NULL,
                            location_dest_id BIGINT UNSIGNED NOT NULL,

                            qty DECIMAL(19, 4) NOT NULL,
                            cost_at_time_of_move DECIMAL(19, 4),
    -- Audit Trail
                            stock_request_line_id BIGINT UNSIGNED NULL,
                            sales_order_id BIGINT UNSIGNED NULL,
                            sales_order_line_id BIGINT UNSIGNED NULL,
                            reference_note VARCHAR(255),
                            version INT DEFAULT 0,
                            status ENUM('draft', 'done', 'cancel'),

                            CONSTRAINT chk_stock_move_qty_pos CHECK (qty > 0),
                            CONSTRAINT fk_move_product FOREIGN KEY (product_id) REFERENCES product(id),
                            CONSTRAINT fk_move_src FOREIGN KEY (location_src_id) REFERENCES location(id),
                            CONSTRAINT fk_move_dest FOREIGN KEY (location_dest_id) REFERENCES location(id),
                            CONSTRAINT fk_move_req FOREIGN KEY (stock_request_line_id) REFERENCES stock_request_line(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- 4. SALES & COMMERCIAL
-- ==========================================

-- 4.1 Sales Order
CREATE TABLE sales_order (
                             id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             order_number VARCHAR(50) NOT NULL UNIQUE,
                             date DATETIME DEFAULT CURRENT_TIMESTAMP,

                             partner_id BIGINT UNSIGNED NULL,
                             popup_store_id BIGINT UNSIGNED NOT NULL,

                             amount_tax DECIMAL(19, 4) DEFAULT 0.00,
                             amount_total DECIMAL(19, 4) DEFAULT 0.00,
                             status ENUM('pending', 'paid', 'cancelled') DEFAULT 'pending',

                             CONSTRAINT fk_order_partner FOREIGN KEY (partner_id) REFERENCES partner(id),
                             CONSTRAINT fk_order_popup FOREIGN KEY (popup_store_id) REFERENCES popup_store(id)
    -- Removed incorrect constraint to location(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4.2 Sales Order Lines
CREATE TABLE sales_order_line (
                                  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                  order_id BIGINT UNSIGNED NOT NULL,
                                  product_id BIGINT UNSIGNED NOT NULL,

                                  qty DECIMAL(19, 4) NOT NULL,
                                  unit_price DECIMAL(19, 4) NOT NULL,
                                  tax_rate DECIMAL(5, 4) DEFAULT 0.00,
                                  price_subtotal DECIMAL(19, 4) NOT NULL, -- usually (qty * price)
                                  price_tax DECIMAL(19, 4) DEFAULT 0.00,  -- calculated tax
                                  price_total DECIMAL(19, 4) NOT NULL,    -- subtotal + tax
                                  applied_commission_rate DECIMAL(5, 4) NOT NULL,


                                  CONSTRAINT chk_qty_pos CHECK (qty > 0),
                                  CONSTRAINT fk_line_order FOREIGN KEY (order_id) REFERENCES sales_order(id),
                                  CONSTRAINT fk_line_product FOREIGN KEY (product_id) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4.3 Sales Payments
CREATE TABLE sales_payment (
                               id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                               order_id BIGINT UNSIGNED NOT NULL,

    -- Links to the specific Ledger Account (e.g., 10100 Cash, or 10101 Stripe Bank)
                               account_id INT UNSIGNED NOT NULL,

                               amount DECIMAL(19, 4) NOT NULL,
                               payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                               reference VARCHAR(100), -- e.g. "Stripe ID: ch_12345" or "Cash Register 1"

                               CONSTRAINT fk_pay_order FOREIGN KEY (order_id) REFERENCES sales_order(id),
                               CONSTRAINT fk_pay_account FOREIGN KEY (account_id) REFERENCES account_account(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- 5. ACCOUNTING (Hidden Ledger)
-- ==========================================

-- 5.0 Settlement (Must exist before account_move links to it)
CREATE TABLE settlement (
                            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                            brand_id BIGINT UNSIGNED NOT NULL,
                            popup_store_id BIGINT UNSIGNED NOT NULL,

                            period_start DATE NOT NULL,
                            period_end DATE NOT NULL,

                            total_sales_amount DECIMAL(19, 4) NOT NULL,
                            commission_fee DECIMAL(19, 4) NOT NULL,
                            payout_amount DECIMAL(19, 4) NOT NULL,

                            status ENUM('pending', 'paid') DEFAULT 'pending',

                            CONSTRAINT fk_settlement_brand FOREIGN KEY (brand_id) REFERENCES brand(id),
                            CONSTRAINT fk_settlement_popup FOREIGN KEY (popup_store_id) REFERENCES popup_store(id),
                            -- Prevent double billing for the same start date, but not foolproof. Add validation logic in the application layer later.
                            UNIQUE KEY uq_brand_popup_period (brand_id, popup_store_id, period_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5.1 Journal Entry Header
CREATE TABLE account_move (
                              id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                              date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              reference VARCHAR(255),
                              payment_id BIGINT UNSIGNED NULL,

    -- Explicit Foreign Keys (Cleaner for your team)
                              sales_order_id BIGINT UNSIGNED NULL,
                              stock_move_id BIGINT UNSIGNED NULL,
                              settlement_id BIGINT UNSIGNED NULL,

                              state ENUM('draft', 'posted') DEFAULT 'draft',

                              CONSTRAINT fk_am_so FOREIGN KEY (sales_order_id) REFERENCES sales_order(id),
                              CONSTRAINT fk_am_pi FOREIGN KEY (payment_id) REFERENCES sales_payment(id),
                              CONSTRAINT fk_am_sm FOREIGN KEY (stock_move_id) REFERENCES stock_move(id),
                              CONSTRAINT fk_am_st FOREIGN KEY (settlement_id) REFERENCES settlement(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5.2 Journal Entry Lines
CREATE TABLE account_move_line (
                                   id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                   move_id BIGINT UNSIGNED NOT NULL,
                                   account_id INT UNSIGNED NOT NULL,

                                   label VARCHAR(255),
                                   debit DECIMAL(19, 4) NOT NULL DEFAULT 0.00,
                                   credit DECIMAL(19, 4) NOT NULL DEFAULT 0.00,
                                    -- RDS MySQL is 8.0.43, so it supports CHECK
                                   CONSTRAINT chk_debit_credit CHECK ((debit = 0 AND credit > 0) OR (credit = 0 AND debit > 0)),
                                   CONSTRAINT fk_aml_move FOREIGN KEY (move_id) REFERENCES account_move(id) ON DELETE RESTRICT,
                                   CONSTRAINT fk_aml_account FOREIGN KEY (account_id) REFERENCES account_account(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- 6. INDEXES & SEED DATA
-- ==========================================

CREATE INDEX idx_stock_product ON stock_move(product_id);
CREATE INDEX idx_aml_account ON account_move_line(account_id);

-- Seed Account Data
INSERT INTO account_account (code, name, type) VALUES
                                                   ('10100', 'Cash / Bank', 'asset'),
                                                   ('10200', 'Inventory Valuation', 'asset'),
                                                   ('12100', 'Accounts Receivable', 'asset'), -- Added (Standard for unpaid invoices)
                                                   ('20100', 'Accounts Payable', 'liability'),
                                                   ('20200', 'Sales Tax Payable', 'liability'), -- Added (CRITICAL for your new tax fields)
                                                   ('40100', 'Sales Revenue', 'revenue'),
                                                   ('50100', 'Cost of Goods Sold', 'expense');

-- Speeds up "Sum of Product X at Location Y"
CREATE INDEX idx_stock_bal ON stock_move(location_dest_id, product_id);
-- index for the source side
CREATE INDEX idx_stock_bal_src ON stock_move(location_src_id, product_id);

CREATE INDEX idx_so_date ON sales_order(date);
CREATE INDEX idx_so_popup ON sales_order(popup_store_id);

-- ==========================================
-- 7. POST-CREATION CONSTRAINTS
-- ==========================================

-- We add this here because stock_move (3.2) is created BEFORE sales_order (4.1)
ALTER TABLE stock_move
    ADD CONSTRAINT fk_move_so
        FOREIGN KEY (sales_order_id) REFERENCES sales_order(id) ON DELETE RESTRICT ,
    ADD CONSTRAINT fk_move_sol
        FOREIGN KEY (sales_order_line_id) REFERENCES sales_order_line(id) ON DELETE SET NULL;
