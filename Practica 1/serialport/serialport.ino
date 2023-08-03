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
  int Temperature = 24;
  int Lumen = 30;
  float Humidity = 20.5;
  float CO2 = 30.4;
  // Enviando los datos por medio de comunicacion serial
  // los delays no son necesarios, por cuestiones de prueba
  // se encuentran con un valor alto.
  Serial.print(Temperature);
  delay(10000);
  Serial.print(Lumen);
  delay(10000);
  Serial.print(Humidity);
  delay(10000);
  Serial.print(CO2);
  delay(10000); // el unico necesario para atrasar la cantidad de veces que se ejecuta la funcion

}
