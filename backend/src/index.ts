import app from './app'
import {createServer} from 'http'
import {config} from 'dotenv'
import path from "path";

config({ path: path.join(__dirname, "../.env") });




const server = createServer(app);

server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on http://localhost:${process.env.PORT || 5000}`);
});

