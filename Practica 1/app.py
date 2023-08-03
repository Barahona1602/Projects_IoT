from flask import Flask
from flask_cors import CORS
import serialPort

app = Flask(__name__)
CORS(app)              # Cross-origin enabled

@app.route('/')
def index():
    print("api index")


def APIStart():
    app.run(debug=True)

