#include <DHT.h>
#include <Servo.h>
int IN1 = 8;
int IN2= 9;

const int ECHO_PIN = A3; 
const int TRIGGER_PIN = A4; 

Servo miServo; 

int anguloInicial = 0; // Angulo inicial del servomotor
int anguloFinal = 180; // Angulo final del servomotor
int paso = 1; 
const int ledPin = A2;

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
  miServo.attach(10);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {



  if (Serial.available() > 0) {
    String comando = Serial.readStringUntil('\n'); // Lee el comando desde la comunicación serial
    comando.trim(); // Elimina espacios en blanco al principio y al final del comando
    
    if (comando == "on") {
      miServo.write(anguloFinal); // Mueve el servo a la posición anguloFinal
      delay(15);
    } else if (comando == "off") {
      miServo.write(anguloInicial); // Mueve el servo a la posición anguloInicial
      delay(15);
    }else if (comando == "on1") {
        motor.setSpeed(100);
      digitalWrite(IN1,HIGH);
      digitalWrite(IN2,LOW);
    } else if (comando == "on12") {
      motor.setSpeed(200);
      digitalWrite(IN1,HIGH);
      digitalWrite(IN2,LOW);
    }
    else if (comando == "off1") {
      digitalWrite(IN1,LOW);
      digitalWrite(IN2,LOW);
    }else if (comando == "on2") {
      digitalWrite(ledPin, HIGH);
      Serial.println("ARQUI2_G8_LED: Si");
    }else if (comando == "off2") {
      digitalWrite(ledPin, LOW);
      Serial.println("ARQUI2_G8_LED: No");
    }
  }




  
  // Lectura de la humedad y la temperatura del sensor DHT11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Lectura de la calidad del aire del sensor MQ135
  int airQuality = analogRead(MQ135PIN);

  sensorVal = analogRead(sensorPin);
  lux = sensorRawToPhys(sensorVal);

  // Mostrar los valores en el monitor serial

  //Serial.print("Temperatura: ");
  Serial.print("ARQUI2_G8_temp: ");
  Serial.println(temperature);
  //Serial.println(" °C\t");

  Serial.print("ARQUI2_G8_luz: ");
  Serial.println(lux); // the analog reading
  //Serial.println(" lumen"); // the analog reading

  Serial.print("ARQUI2_G8_humedad: ");
  Serial.println(humidity);
 // Serial.println(" %\t");


  Serial.print("ARQUI2_G8_air: ");
  Serial.println(airQuality);
  //Serial.println(" ppm");


  float distance = getDistance();
  Serial.print("ARQUI2_G8_distancia: ");
  Serial.println(distance);




  if (distance < 15 && digitalRead(ledPin) == LOW) {
    digitalWrite(ledPin, HIGH);
    Serial.println("ARQUI2_G8_LED: Si");
    

  } else if (distance>15 && digitalRead(ledPin) == HIGH) {
    Serial.println("ARQUI2_G8_NOTIFICACION: Habitación iluminada sin presencia humana");
    delay(10000);
    digitalWrite(ledPin, LOW);
    Serial.println("ARQUI2_G8_NOTIFICACION: Iluminada apagada");
    Serial.println("ARQUI2_G8_LED: No");

  } 

  if (airQuality > 200){
    Serial.println("ARQUI2_G8_NOTIFICACION: Aire de la habitación, en condiciones, No optima");
    digitalWrite(IN1,HIGH);
    digitalWrite(IN2,LOW);
    delay(10000);
    digitalWrite(IN1,LOW);
    digitalWrite(IN2,LOW);
    Serial.println("ARQUI2_G8_NOTIFICACION: aire en la habitación en condiciones óptimas");
  }


  delay(DELAY); // Esperar unos segundos antes de leer nuevamente









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
