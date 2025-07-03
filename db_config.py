# db_config.py
def get_connection():
    import mysql.connector
    return mysql.connector.connect(
        host="localhost",
        user="your_username",
        password="your_password",
        database="your_database"
    )
    # 🔐 Replace with your own local MySQL credentials

