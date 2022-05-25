
#include <MFRC522.h>
#include <SPI.h>

#define RST_PIN 9
#define SS_PIN 10

MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup()
{
  Serial.begin(9600);

  SPI.begin();

  mfrc522.PCD_Init();
}

void scanUid() {

  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    //Serial.println("PICC_IsNewCardPresent");

    return;
  }

  if ( ! mfrc522.PICC_ReadCardSerial())
  {
    //Serial.println("PICC_ReadCardSerial");

    return;
  }

  String uid = "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++)
  {
    uid.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    uid.concat(String(mfrc522.uid.uidByte[i], HEX));
  }

  Serial.println(uid);
}

void loop()
{
  scanUid();
}
