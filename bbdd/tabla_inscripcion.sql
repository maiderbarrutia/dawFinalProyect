CREATE TABLE Registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES UserData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES Activity(activity_id) ON DELETE CASCADE,
    INDEX (user_id),
    INDEX (activity_id)
);

INSERT INTO Registration (user_id, activity_id, registration_date)
VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW()),
(5, 5, NOW()),
(6, 6, NOW()),
(7, 7, NOW()),
(8, 8, NOW()),
(9, 1, NOW()),
(10, 2, NOW());





