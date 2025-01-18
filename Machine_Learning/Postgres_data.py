import psycopg2
import pandas as pd
import os
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 
def fetch_orders():
    # Database connection with SSL
    conn = psycopg2.connect(
        host=os.getenv("HOST"),
        port=os.getenv("PORT"),
        database=os.getenv("DATABASE"),
        user=os.getenv("USER"),
        password=os.getenv("PASSWORD"),
        sslmode=os.getenv("SSLMODE"),
    )

    # Query to fetch orders
    query = """
SELECT "categories" FROM "OrderProduct";
"""
    df = pd.read_sql(query, conn)

    # Close the connection
    conn.close()
    return df

if __name__ == "__main__":
    order = fetch_orders()
    print(order.head())
