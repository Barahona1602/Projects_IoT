# ACE 2 Grupo 8
Librerias necesarias que se deben de instalar para correr la aplicacion:
```
pip install pyserial
pip install pymongo
pip install Flask
pip install Flask-CORS
```
Luego debemos establecer una conexion con mongodb y extraer el enlace de conexion, despues debemos crear una base de datos llamada `ACE2` y que esta contenga una colleccion llamada `Medicion`.


## Configuracion
Cambiar donde dice `serial_port` por el puerto que el arduino esta utilizando.
.ino
```
PORT = 'serial_port'
BAUD_RATE = 9600
```
.py
```
PORT = 'serial_port'
BAUD_RATE = 9600
```

## Flujo del programa

1. Arduino     -> Puerto serial de la pc    -> DB
2. Processing  -> API
3. API         -> DB