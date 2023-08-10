#define SWITCH 8

// Manera en la que se envian los datos
  int Temperature = 12;
  int Lumen = 20;
  float Humidity = 30;
  float CO2 = 40;

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
  
  // Enviando los datos por medio de comunicacion serial
  // los delays son necesarios, por cuestiones de prueba
  // se encuentran con un valor alto.
  Serial.println(Temperature);
  Serial.println(Lumen);
  Serial.println(Humidity);
  Serial.println(CO2);
  delay(1000); // el unico necesario para atrasar la cantidad de veces que se ejecuta la funcion
  Temperature++;
  Lumen++;
  Humidity++;
  CO2++;
}
