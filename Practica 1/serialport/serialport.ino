#define SWITCH 8

void setup() {
  /*
   *
   * ARCHIVO DE REPRESENTACION
   *
   */
   Serial.begin(9600);
   pinMode(SWITCH, INPUT);
}

void loop() {
  // Llamando a la funcion SendData
  if (digitalRead(SWITCH)) {
    SendData();
  }
}



void SendData() {
  // Manera en la que se envian los datos
  int Temperature = 5;
  int Lumen = 4;
  float Humidity = 3.5;
  float CO2 = 2.4;
  // Enviando los datos por medio de comunicacion serial
  // los delays son necesarios, por cuestiones de prueba
  // se encuentran con un valor alto.
  Serial.print(Temperature);
  delay(1000);
  Serial.print(Lumen);
  delay(1000);
  Serial.print(Humidity);
  delay(1000);
  Serial.print(CO2);
  delay(1000); // el unico necesario para atrasar la cantidad de veces que se ejecuta la funcion

}
