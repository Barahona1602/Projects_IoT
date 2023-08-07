from flask import Flask, jsonify
from flask_cors import CORS
from database import db

app = Flask(__name__)
CORS(app)              # Cross-origin enabled


@app.route('/', methods=['GET'])
def index():
    return "Hello from API"

@app.route('/all', methods=['GET'])
def all():
    db.Connect()
    mediciones = db.getCollection()
    if mediciones is None:
       return jsonify({'error': 'no se pudo obtener los datos'})
    lista_mediciones = list(mediciones)
    dict_mediciones = [doc for doc in lista_mediciones]
    db.Close()
    # print(dict_mediciones)
    return jsonify(dict_mediciones) 

@app.route('/last', methods=['GET'])
def last():
    db.Connect()
    medicion = db.getLastValue()
    if medicion is None:
       return jsonify({'error': 'no se pudo obtener los datos'})
    # print(dict_mediciones)
    return jsonify(medicion) 

def start():
    app.run()