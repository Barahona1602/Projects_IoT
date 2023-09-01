#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <ESP8266WebServer.h>

String data = "";
#define USE_SERIAL Serial;
SoftwareSerial cliente(4,5);

unsigned long startTime; // Variable para almacenar el tiempo de inicio
const unsigned long duration = 20000;


const char* ssid = "HONOR X8";
const char* password = "Ryan12345";


IPAddress local_ip(192,168,132,143);
IPAddress gateway(192,168,132,91);
IPAddress subnet(255,255,255,0);




String temperatura = "";
String Humedad = "";
String Distancia = "";
String Iluminacion = "";
String aire = "";

//WiFiServer server(80);
ESP8266WebServer server(80);
String header;

unsigned long lastTime, timeout = 2000;

///////////// CODIGO ///////////////

const int outputPin = D0; // pin de salida
const int outputPin2 = D3;
String outputState = "apagado"; //almacenar el estado actual de la salida
String outputState2 = "apagado"; //almacenar el estado actual de la salida


void setup() {
  data = "";
  startTime = millis(); // Guardar el tiempo de inicio
  Serial.begin(115200);
  cliente.begin(115200);

  pinMode(outputPin, OUTPUT);
  digitalWrite(outputPin, LOW);
  
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid,password);

  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Dispositivo conectado.");
  Serial.println("Direccion IP: ");
  Serial.print(WiFi.localIP());
  Serial.println("Puerta de enlace (Gateway): ");
  Serial.print(WiFi.gatewayIP());

  server.on("/", handle_OnConnect);
  server.on("/getTemperature", handle_Temperature);
  server.on("/fanOn", handle_fanOn);
  server.on("/fanOff", handle_fanOff);
  server.on("/fanOn2", handle_fanOn2);
  server.on("/lightOn", handle_lightOn);
  server.on("/lightOff", handle_lightOff);
  server.on("/getIluminacion", handle_Iluminacion);
  server.on("/getAire", handle_aire);
  server.on("/getAviso", handle_avisos);
 


  server.begin();

}

void loop() {
    server.handleClient();

    if (cliente.available() > 0) {
      
    char d = cliente.read();

    if (d == '\n') {

      
      int index = 0;
      int lastIndex = 0;
      int count = 0;
      while (index != - 1 ){
        index = data.indexOf(';',lastIndex);
        String Value = data.substring(lastIndex,index);
        switch (count){
          case 0:
            temperatura = Value;
            break;
          case 1:
            Iluminacion = Value;
            break;
          case 2:
            Humedad = Value;
            break;
          case 3:
            aire = Value;
            break;
          case 4:
            Distancia = Value;
            break;


        }
        lastIndex = index + 1;
        count++;
      }

      


      Serial.println(temperatura);
      Serial.println(Iluminacion);
      Serial.println(Humedad);
      Serial.println(aire);
      Serial.println(Distancia);

      data = "";

    }
    else {

      
    data += d;


    }

  }



  // WiFiClient client = server.available();

  // if(client)
  // {
  //   lastTime = millis();
    
  //   Serial.println("Nuevo cliente");
  //   String currentLine = "";

  //   while(client.connected() && millis() - lastTime <= timeout)
  //   {

  //     if(client.available())
  //     {
        
  //       char c = client.read();
  //       Serial.write(c);
  //       header += c;

  //       if(c == '\n')
  //       {
          
  //         if(currentLine.length() == 0)
  //         {

  //           ////////// ENCABEZADO HTTP ////////////

  //           client.println("HTTP/1.1 200 OK");
  //           client.println("Content-type:text/html");
  //           client.println("Connection: close");
  //           client.println();



  //           if (header.indexOf("GET /lightOn") >= 0) {
  //             Serial.println("Led encendido");
  //             outputState = "encendido";
             
  //             digitalWrite(outputPin, HIGH);
  //           }                         
  //           else if (header.indexOf("GET /lightOff") >= 0) {
  //             Serial.println("Led apagado");
  //             outputState = "apagado";
            
  //             digitalWrite(outputPin, LOW);
              
  //           } 
  //           else if (header.indexOf("GET /fanOff") >= 0) {
  //             Serial.println("GPIO apagado");
  //             outputState = "apagado";
              
  //             digitalWrite(outputPin, LOW);
              
  //           } 
  //           else if (header.indexOf("GET /fanOn") >= 0) {
  //             Serial.println("Vnetilador Encendido");
  //             outputState = "encendido";
             
  //             digitalWrite(outputPin, LOW);

              
  //           } 
  //           else if (header.indexOf("GET /fanOn2") >= 0) {
  //             Serial.println("Ventilador Encendido x2");
  //             outputState = "encendido";
              
  //             digitalWrite(outputPin, LOW);
              
  //           } 
  //           else if (header.indexOf("GET /humedad") >= 0) {


  //             Serial.println("Ventilador Encendido x2");
  //             outputState = "encendido";
              
  //             digitalWrite(outputPin, LOW);
              
  //           } 


            
            

  //            //////// PAGINA WEB //////////////
             
  //           client.println("<!DOCTYPE html><html>");
  //           client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  //           client.println("<link rel=\"icon\" href=\"data:,\">");
  //           client.println("</head>");

  //           client.println("<body></body>");

  //           client.println("</html>");

  //           client.println();
  //           break;

            
  //           /////////////////////////////////////
  //         }
  //         else
  //         {
  //           currentLine = "";
  //         }
  //       }
  //       else if ( c != '\r')
  //       {
  //         currentLine += c;
  //       }
        
        
  //     }

      
  //   }

  //   header = "";
  //   client.stop();
  //   Serial.println("Cliente desconectado.");
  //   Serial.println("");
  // }

}

void handle_OnConnect() {
  Serial.println("Servidor Iniciado"); 
}
void handle_Temperature() {

  server.send(200, "text/plain", temperatura); 
}

void handle_Iluminacion() {

  server.send(200, "text/plain", Iluminacion); 
}
void handle_aire() {

  server.send(200, "text/plain", aire); 
}
void handle_avisos() {

  if (aire.toFloat() > 300.00){
     server.send(200, "text/plain", "La calidad de aire es peligrosa"); 
  }else{
    server.send(200, "text/plain", "La calidad de aire es óptima");
  }

  if (Distancia.toFloat() < 15.00){
    server.send(200, "text/plain", "Hay alguien en la habitación"); 
    digitalWrite(outputPin, HIGH);
  } else {
    server.send(200, "text/plain", "Habitación vacía"); 
  }




}
void handle_lightOn() {
    // encender luces
    Serial.print("led encendido");
    digitalWrite(outputPin, HIGH);
}


void handle_lightOff() {
    // apagar luces
    if 
    digitalWrite(outputPin, LOW);
}

void handle_fanOn() {
    // encender ventilador
      if (Distancia.toFloat() > 15.00){
    Serial.println("ventilador encendido");
    digitalWrite(outputPin2, HIGH);
      }
}

void handle_fanOff() {
    // apagar ventilador
    if (aire.toFloat() < 300.00){
    Serial.println("ventilador apagado");
    digitalWrite(outputPin2, LOW);
    }
}

void handle_fanOn2() {
    // encender ventilador 2
    digitalWrite(outputPin2, HIGH);
}

