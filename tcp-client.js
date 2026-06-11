
const net = require("net");

const client = net.createConnection({ port: 3001, host: "localhost" }, () => {
  console.log("Подключен к TCP микросервису");
  
  const message = JSON.stringify({
    pattern: { cmd: "create_short_url" },
    data: { originalUrl: "https://tcp-test.com", customCode: "tcp2026" },
    id: Date.now()
  });
  
  const length = Buffer.byteLength(message);
  const buffer = Buffer.alloc(4 + length);
  buffer.writeUInt32BE(length, 0);
  buffer.write(message, 4);
  
  client.write(buffer);
});

let buffer = Buffer.alloc(0);

client.on("data", (data) => {
  buffer = Buffer.concat([buffer, data]);
  
  while (buffer.length >= 4) {
    const length = buffer.readUInt32BE(0);
    if (buffer.length >= 4 + length) {
      const message = buffer.subarray(4, 4 + length).toString();
      const response = JSON.parse(message);
      console.log("Ответ от микросервиса:", response);
      buffer = buffer.subarray(4 + length);
      client.end();
    } else {
      break;
    }
  }
});

client.on("error", (err) => {
  console.error("Ошибка:", err.message);
});

client.on("end", () => {
  console.log("Отключен от микросервиса");
});

