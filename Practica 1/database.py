import pymongo
from datetime import datetime
from typing import List

'''
Data Schema {
    Temperature:    number,
    Lumen:          number,
    Humidity:       number,
    CO2:            number,
    Fecha:          string,
    Hora:           string,
    Minutos:        string,
    Segundos:       string
,}
'''

# CONST SECTION
URL = "mongodb://localhost:27017"
DB_NAME = "ACE2"
COLLECTION_NAME = "Medicion"

class databaseManager:
    def __init__(self, URL:str, DB_NAME: str, COLLECTION_NAME: str) -> None:
        self.URL = URL
        self.DB_NAME = DB_NAME
        self.COLLECTION_NAME = COLLECTION_NAME
        self.client: pymongo.MongoClient = None

    def Connect(self) -> None:
        self.client = pymongo.MongoClient(self.URL)
        print("Conection Stablished!")

    def Close(self) -> None:
        if self.client is None:
            print("there is no conection to close...")
            return
        self.client.close()

    def insertValue(self, data: List[float]) -> bool:    
        # Comprobando que exista un cliente para luego insertar un valor
        if self.client is None:
            print("Error: Couldn't insert value")
            return False

        # Creando un nuevo elemento de la base de datos
        new_element = {
            "Temperature": float(data[0]),
            "Lumen": float(data[1]),
            "Humidity": float(data[2]),
            "CO2": float(data[3]),
            "Fecha": str(datetime.now().date()),
            "Hora": str(datetime.now().hour),
            "Minutos": str(datetime.now().minute),
            "Segundos": str(datetime.now().second)
        } 
        database = self.client[self.DB_NAME]            # Base de datos seleccionada
        collection = database[self.COLLECTION_NAME]     # Colleccion seleccionada
        collection.insert_one(new_element)              # Insertando un valor nuevo a la colleccion
        return True
    
    def getLastValue(self):
        if self.client is None:
            print("the client doesn't exists")
            return None
        database = self.client[self.DB_NAME]
        collection = database[self.COLLECTION_NAME]
        mediciones = collection.find({},{'_id' : 0})
        ultima_medicion = list(mediciones)
        if ultima_medicion is None:
            return None
        return ultima_medicion[len(ultima_medicion)-1]


    def getCollection(self):
        if self.client is None:
            print("the client doesn't exists")
            return None
        database = self.client[self.DB_NAME]
        # print(type(database))
        collection = database[self.COLLECTION_NAME]
        # print(type(collection))
        return collection.find({}, {'_id' : 0})


db = databaseManager(URL, DB_NAME, COLLECTION_NAME)