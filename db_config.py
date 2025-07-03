import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",        # change this
        password="Rujal.122",    # change this
        database="ev_swap_db"
    )
