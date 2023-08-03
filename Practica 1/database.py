import pymongo
from typing import List

'''
Data Schema {
    Temperature:    number,
    Lumen:          number,
    Humidity:       number,
    CO2:            number
}
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
            "Temperature": data[0],
            "Lumen": data[1],
            "Humidity": data[2],
            "CO2": data[3]
        } 
        database = self.client[self.DB_NAME]            # Base de datos seleccionada
        collection = database[self.COLLECTION_NAME]     # Colleccion seleccionada
        collection.insert_one(new_element)              # Insertando un valor nuevo a la colleccion
        return True

db = databaseManager(URL, DB_NAME, COLLECTION_NAME)