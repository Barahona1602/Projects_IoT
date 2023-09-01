#include <DHT.h>
#include <SoftwareSerial.h>

 SoftwareSerial mega(2,3);

String data = "";

#define DHTPIN 4         // Pin del sensor DHT11
#define DHTTYPE DHT11    // Tipo del sensor DHT (DHT11 o DHT22)
#define MQ135PIN A1      // Pin del sensor MQ135

// Constants
#define DELAY 3000 // Delay between two measurements in ms
#define VIN 5 // V power voltage
#define R 10000 //ohm resistance value

// Parameters
const int sensorPin = A0; // Pin connected to LDR sensor
const int ledPin = A2;    // Pin connected to LED
const int VentPin = A3;    // Pin connected to LED

// Variables
int sensorVal; // Analog value from the LDR sensor
int lux; // Lux value

DHT dht(DHTPIN, DHTTYPE);

// Ultrasonic sensor pins
const int TRIGGER_PIN = 5; // Change this to your TRIGGER pin number
const int ECHO_PIN = 6;    // Change this to your ECHO pin number

void setup() {
   Serial.begin(115200);
   mega.begin(115200);
   dht.begin();
   pinMode(TRIGGER_PIN, OUTPUT);
   pinMode(ECHO_PIN, INPUT);
   pinMode(ledPin, OUTPUT);
   pinMode(VentPin, OUTPUT);
 }

 void loop() {
  // Lectura de la humedad y la temperatura del sensor DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Lectura de la calidad del aire del sensor MQ135
  int airQuality = analogRead(MQ135PIN);

  sensorVal = analogRead(sensorPin);
  lux = sensorRawToPhys(sensorVal);

  // Lectura de la distancia del sensor ultrasónico
  float distance = getDistance();

  // Mostrar los valores en el monitor serial

  String output = String(temperature) + ";" + String(lux) + ";" + String(humidity) + ";" + String(airQuality) + ";" + String(distance) + "\n";

  for (int i=0; i<output.length(); i++){
    mega.write(output[i]);
    
  }
  Serial.println(output);
  delay(1500);

  

  // Encender la luz LED si la distancia es menor a 5 cm
  if (distance < 5) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(VentPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
    digitalWrite(VentPin, LOW);
  } 



  


  

   // Esperar unos segundos antes de leer nuevamente
}

int sensorRawToPhys(int raw) {
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023)); // Conversion analog to voltage
  float RLDR = (R * (VIN - Vout)) / Vout; // Conversion voltage to resistance
  int phys = 500 / (RLDR / 1000); // Conversion resitance to lumen
  return phys;
}

float getDistance() {
  digitalWrite(TRIGGER_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = duration * 0.034 / 2; // Calculate distance in cm

  return distance;
}