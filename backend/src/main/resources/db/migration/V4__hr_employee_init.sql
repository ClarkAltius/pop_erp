CREATE TABLE hr_employee (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED UNIQUE NOT NULL, -- Links to your sys_user

    hourly_rate DECIMAL(19, 4) NOT NULL DEFAULT 0.00,
    hired_date DATE,
    emergency_contact VARCHAR(255),

    CONSTRAINT fk_hr_user FOREIGN KEY (user_id) REFERENCES sys_user(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;