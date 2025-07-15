import fs from 'fs';
import { google } from 'googleapis';

// Paste your full service account JSON here:
const serviceAccount = {
  type: 'service_account',
  project_id: 'bmc-donations',
  private_key_id: '2115ab634a4386a3f7bf7c25ee872c4520c50412',
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsHbnT48OfklfJ
DKDPc2CvqzNBecTBbngQaPB+hrSdxiFJUV+mfy3A404zGe2wb+/PsiSJqaKSoHMl
hncYdoBTY+GY9PwOAr06sRqiFoO4Dk8piVbFeSKchbPOvoChpPvMh2h0J7QLU9V/
OExVUL6rpyb5iVd0bu8UPXlQ5RnqXSpuIir/RLV8yuaHwXdKGg+UVkzAkPQO54BU
41B9FsIRFiOGtCzHYaMB+/ou1TB9qOXwCb6VFVY50zjy/+mSHLmrdFdlIi+2V8g5
g9o2OylbjrA2D4bKD+9eKdWgle4lJE4NT4c6tJ5IIesAOki52IsFvuKu+UdO2Tx1
JsDPWPx9AgMBAAECggEAB+ZVYSRTFj/hR5kMyHjDN0zkTV0JatdnK1mlsCj+oT82
x+a0PTAZKYFFVZMbFb4Ng7rpcmgWziQPJOnHDZhiy3EKKbsU1o/Jn6gBUO83nHsL
pxxmnymwLP72Acc8oC6yX/DXGn24Bc0TP4OV/VR3a+mAIHPtT6rHzmYD63KYfek1
Wmq3miQjJfUEYeF/KDjg9QcVZl705WjMb+YcxkO8aTf49HdyjvgYGdErcoTYxPWh
9ff5hl4qwbFpsaecjcjZju5bgtkNMrD/TET7cZLscu340e1RqX+lYIYz6FfnE1c0
Y6jlOHX0SHIsi1bzLi68r7wg0j5w2YzwtSgXnQcYAQKBgQDvLDeJgCXHx43fvOeV
dUBIHvrr9hGGDTepSgEof80NAVLYcmp9CtXpKwMnWsf27vLRx1pXdD1kUsWHRwBq
Cjy9kSq2FjBtcftZP7Olmi6a+kIkujZ033MFafWUoOI6mDDNzo+6NW0bwf9D8YI5
M6Ss47NjuJY1+sKaC5Z3ILt3SQKBgQC4Ob2F2VsS+f2CHsa64GwPzouDDNm0cYrq
ulN16i4+2kiOGw/lqJNLYROcC9s+K3FnmNxh0pJnBVZBwE/9tbaCP73ZCRv3vFgt
2MSny9j60W7y+1NRVhN6R6Tl43Z5ZvhKNs9isUOzrm/YSlYk3+lpKBptZhv+8jvj
mHlp7V0XlQKBgQCRB0L2Adrm9b61+RqEqoC8Ouz0wFWH7+Pcp59kK3rvc+oEjfy8
riFgLlDPQGEY/3QGeNfzR+0iNH7KtOcvZd3HJYu8tl/PPdqoF9Sbio7QMwiAtNno
rMZWdhYQdi44UajmY2cMBvGOb2iWjo/kl8g3fit9QKT1PoVaW8R1oEeM4QKBgQC1
pdlF3Sd78psQbiAtq5NhkprlQQp4bWw4PjiFD79BoiHgXLa0ECAMN1AKkXZAOr27
FHJY0jQg+JYwhttYoo+upgMfuWemQkQAELj3anwr882eMEna7TCPZY0mT75Fvk4b
fyfFfFvxE5Kchc+i1FVlpnFIZWI9Y8PBilpNJAqicQKBgGyjv075uaYGZjli/s7X
7RH9D0iislKhTMKtDRBSeeH9KJIFPmDS2zPN3sYArqdKRDgRCSuB19N4W4aZn4k+
W3T48wmsWPfO1oxhJY9WnhYLJBIhf/OZuedpwIZZHcpmdo9b1uD3t2Bd/W1lBI8R
RbKcyZ/PldCFoL1nY10LoRFi
-----END PRIVATE KEY-----`,
  client_email: 'quickturn-cbt@bmc-donations.iam.gserviceaccount.com',
};

// Replace with your actual Google Sheet ID:
const spreadsheetId = '1_xmWT-2DiWmbIl4c4n8PvkqKbeQyjtsYFoNeUP2Fn9c'; // <- put your sheet ID here

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccount.client_email,
      private_key: serviceAccount.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const range = 'Sheet1!D2:D'; // adjust if needed

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = res.data.values || [];
  const amounts = rows.map((row) => parseFloat(row[0])).filter((x) => !isNaN(x));
  const total = amounts.reduce((sum, val) => sum + val, 0);

  const output = { total };
  fs.writeFileSync('public/donations.json', JSON.stringify(output, null, 2));
  console.log('✅ donations.json updated:', output);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
