from flask import Flask, jsonify
from flask_cors import CORS
from database import db
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

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
       return jsonify({'error': 'No se encontraron datos'})
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
       return jsonify({'error': 'No se encontraron datos'})
    # print(dict_mediciones)
    return jsonify(medicion) 

@app.route('/graph', methods=['GET'])
def graph():
    name = 'frontend/Temperature.png'
    if os.path.exists(name):
        os.remove(name)
    name = 'frontend/Lumen.png'
    if os.path.exists(name):
        os.remove(name)
    name = 'frontend/Humidity.png'
    if os.path.exists(name):
        os.remove(name)
    name = 'frontend/CO2.png'
    if os.path.exists(name):
        os.remove(name)
    db.Connect()
    mediciones = db.getCollection()
    if mediciones is None:
        return jsonify({'error': 'No se encontraron datos'})
    lista_mediciones = list(mediciones)
    # Creamos nuestras listas para luego separar nuestras graficas
    fechas = []
    temps = []
    lums = []
    hums = []
    cos = []
    for medicion in lista_mediciones:
        fechas.append(medicion['Fecha'])
        temps.append(medicion['Temperature'])
        lums.append(medicion['Lumen'])
        hums.append(medicion['Humidity'])
        cos.append(medicion['CO2'])
    # Grafica de temperatura
    plt.plot(fechas, temps, marker='o', linestyle='-', color='r')
    plt.xlabel('Fecha')
    plt.ylabel('Temperatura')
    plt.title('Temperatura vs Tiempo')
    plt.savefig('frontend/Temperature.png')
    plt.close()
    # Grafica de Luminosidad 
    plt.plot(fechas, lums, marker='o', linestyle='-', color='y')
    plt.xlabel('Fecha')
    plt.ylabel('Luminosidad')
    plt.title('Luminosidad vs Tiempo')
    plt.savefig('frontend/Lumen.png')
    plt.close()
    # Grafica de Humedades
    plt.plot(fechas, hums, marker='o', linestyle='-', color='b')
    plt.xlabel('Fecha')
    plt.ylabel('Humedad')
    plt.title('Humedad vs Tiempo')
    plt.savefig('frontend/Humidity.png')
    plt.close()
    # Grafica de Humedades
    plt.plot(fechas, cos, marker='o', linestyle='-', color='g')
    plt.xlabel('Fecha')
    plt.ylabel('Calidad del aire')
    plt.title('Calidad del aire vs Tiempo')
    plt.savefig('frontend/CO2.png')
    plt.close()
    return jsonify({'status': 'imagenes creadas correctamente'})
    
def start():
    app.run()