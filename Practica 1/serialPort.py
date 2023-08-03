from database import db
import serial
import time

'''Configuracion del puerto serial'''
PORT = 'COM5'
BAUD_RATE = 9600

def Execute() -> None:
    # Creacion del objeto(puerto serial)
    ser = serial.Serial(PORT, BAUD_RATE)
    print(f"Listenning to port {PORT}")
    time.sleep(2)
    try:
        ReadData(ser)
    except KeyboardInterrupt:
        print("Transmission ended")
        ser.close()

def ReadData(serial: serial) -> None:
    data = []
    while True:
        time.sleep(1)
        '''Guardamos los datos en la base de datos y luego vaciamos el arreglo'''
        if len(data) == 4:
            db.Connect()
            db.insertValue(data)
            db.Close()
            data = []

        if serial.in_waiting <= 0:
            continue
        
        received: str = serial.read(serial.in_waiting).decode('utf-8')
        data.append(float(received))
        print("Received: ", received)
        # incrementamos el contador
