from flask import Flask, render_template
import db_config

app = Flask(__name__)

@app.route('/')
def homepage():
    return render_template('home.html')  # New homepage

@app.route('/map')
def map_page():
    conn = db_config.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM stations")
    stations = cursor.fetchall()
    cursor.close()
    conn.close()

    return render_template('map.html', stations=stations)


if __name__ == '__main__':
    app.run(debug=True)
