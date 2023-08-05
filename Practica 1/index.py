import serialPort
from app import start
import threading

def main():
    api = threading.Thread(target=start)
    serial = threading.Thread(target=serialPort.Execute)
    serial.start()
    api.start()
    
if __name__ == "__main__":
    main()