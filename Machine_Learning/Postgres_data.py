import psycopg2
import pandas as pd
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def fetch_orders():
    """Fetch orders data from the database."""
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
    query_OrderProducts = """
    SELECT "id", "userId", "orderId", "productId", "categories" 
    FROM "OrderProduct";
    """
    df_1 = pd.read_sql(query_OrderProducts, conn)

    # Close the connection
    conn.close()
    return df_1

def fetch_products():
    """Fetch product data from the database."""
    # Database connection with SSL
    conn = psycopg2.connect(
        host=os.getenv("HOST"),
        port=os.getenv("PORT"),
        database=os.getenv("DATABASE"),
        user=os.getenv("USER"),
        password=os.getenv("PASSWORD"),
        sslmode=os.getenv("SSLMODE"),
    )

    # Query to fetch products
    query_Products = """
    SELECT "id", "name", "description", "categories" 
    FROM "Product";
    """
    df_2 = pd.read_sql(query_Products, conn)

    # Close the connection
    conn.close()
    return df_2

if __name__ == "__main__":
    userid = int(input("Enter the user id: "))

    # Fetch orders and products data
    order = fetch_orders()
    product = fetch_products()

    # Filter orders for the given user ID
    user_orders = order[order['userId'] == userid]

    # Print the product IDs for the given user
    product_ids = user_orders['productId'].tolist()

    print("Product IDs for User ID", userid, ":\n", product_ids)

    # Count occurrences of each product ID
    product_counts = pd.Series(product_ids).value_counts()

    # Print the counts for each product ID
    print("\nProduct ID Counts:")
    for product_id, count in product_counts.items():
        print(f"Product ID: {product_id}, Count: {count}")

    # Recommend products based on the most ordered product IDs
    top_product_ids = product_counts.index.tolist()  # Get top 5 products

    print(f"\nTop 5 Recommended Products based on the user's order history:")
    recommended_products = product[product['id'].isin(top_product_ids)]

    # Print recommended products
    if recommended_products.empty:
        print("\nNo products found in the top recommended list.")
    else:
        print(f"\nRecommended Products for User ID {userid}:\n")
        print(recommended_products[['id', 'name', 'description']])
