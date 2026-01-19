-- ==========================================
-- 8. POS SESSION MANAGEMENT
-- ==========================================

CREATE TABLE pos_session (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    popup_store_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL, -- The staff member responsible

    start_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stop_at TIMESTAMP NULL,

    -- Cash Control
    opening_balance DECIMAL(19, 4) DEFAULT 0.00, -- Amount in drawer at start
    closing_control_balance DECIMAL(19, 4) NULL, -- Amount staff counted at end
    closing_total_amount DECIMAL(19, 4) NULL,    -- System calculated total

    status ENUM('opening_control', 'opened', 'closing_control', 'closed') DEFAULT 'opened',

    CONSTRAINT fk_session_popup FOREIGN KEY (popup_store_id) REFERENCES popup_store(id),
    CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES sys_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Link Sales Orders to a Session
ALTER TABLE sales_order
    ADD COLUMN pos_session_id BIGINT UNSIGNED NULL,
    ADD CONSTRAINT fk_order_session FOREIGN KEY (pos_session_id) REFERENCES pos_session(id);