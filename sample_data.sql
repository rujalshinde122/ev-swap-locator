CREATE TABLE stations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(255),
  city VARCHAR(100),
  pincode VARCHAR(10),
  latitude FLOAT,
  longitude FLOAT,
  battery_available INT,
  hours VARCHAR(100)
);

INSERT INTO stations (name, address, city, pincode, latitude, longitude, battery_available, hours)
VALUES 
('Powai Battery Point', 'Powai Lake Rd', 'Mumbai', '400076', 19.117, 72.904, 4, '8am–8pm');
