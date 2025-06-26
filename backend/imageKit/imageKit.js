import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL,
});

export default imageKit;
