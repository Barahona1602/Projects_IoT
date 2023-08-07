import base64
import os

class ImageHandler:

    def __init__(self, outputImageName: str = None) -> None:
        self.imageInBytes= None
        self.outputImageName = outputImageName

    def fromJPGToBytes(self, imagePath: str):
        with open(imagePath, 'rb') as image_file:
            self.binaryImage = image_file.read()
        return self

    def fromBytesToJPG(self):
        if self.outputImageName is None:
            print('No se encuentra el nombre de la imagen a exportar')
            return

        if self.binaryImage is None:
            print('No se encuentra el archivo binario de la imagen')
            return

        with open(self.outputImageName, 'wb') as output_file:
            output_file.write(self.binaryImage)
        return self

    def getBytes(self):
        return base64.b64encode(self.imageInBytes).decode('utf-8')
    
    def setBytes(self, imageInBytes: str):
        self.imageInBytes = base64.b64encode(imageInBytes)