#include <DHT.h>

#define DHTPIN 4         // Pin del sensor DHT11
#define DHTTYPE DHT11    // Tipo del sensor DHT (DHT11 o DHT22)
#define MQ135PIN A1      // Pin del sensor MQ135

DHT dht(DHTPIN, DHTTYPE);

// Constants
#define DELAY 3000 // Delay between two measurements in ms
#define VIN 5 // V power voltage
#define R 10000 //ohm resistance value

// Parameters
const int sensorPin = A0; // Pin connected to sensor

//Variables
int sensorVal; // Analog value from the sensor
int lux; //Lux value

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // Lectura de la humedad y la temperatura del sensor DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Lectura de la calidad del aire del sensor MQ135
  int airQuality = analogRead(MQ135PIN);

  sensorVal = analogRead(sensorPin);
  lux = sensorRawToPhys(sensorVal);

  // Mostrar los valores en el monitor serial

  //Serial.print("Temperatura: ");
  Serial.println(temperature);
  //Serial.println(" °C\t");

  //Serial.print("Physical value from sensor = ");
  Serial.println(lux); // the analog reading
  //Serial.println(" lumen"); // the analog reading

 // Serial.print("Humedad: ");
  Serial.println(humidity);
 // Serial.println(" %\t");


  //Serial.print("Calidad del aire: ");
  Serial.println(airQuality);
  //Serial.println(" ppm");





  delay(DELAY); // Esperar unos segundos antes de leer nuevamente
}

int sensorRawToPhys(int raw) {
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023)); // Conversion analog to voltage
  float RLDR = (R * (VIN - Vout)) / Vout; // Conversion voltage to resistance
  int phys = 500 / (RLDR / 1000); // Conversion resitance to lumen
  return phys;
}
