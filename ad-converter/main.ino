#define SENSOR_INPUT A7
#define SIGNAL_OUTPUT 10

int analogValue;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(SENSOR_INPUT, INPUT);
  pinMode(SIGNAL_OUTPUT, OUTPUT);

  // logging
  Serial.begin(9600);
}

void loop() {
  analogValue = analogRead(SENSOR_INPUT);

  Serial.print("Value ");
  Serial.println(analogValue);

  // Total dark ~ 1023, light ~ 100
  if (analogValue < 500) {
    // washing machine LED is ON, the washing cycle has finished
    digitalWrite(LED_BUILTIN, LOW);
    digitalWrite(SIGNAL_OUTPUT, HIGH);
  } else {
    // washing machine LED is OFF
    digitalWrite(LED_BUILTIN, HIGH);
    digitalWrite(SIGNAL_OUTPUT, LOW);
  }

  delay(500);
}
