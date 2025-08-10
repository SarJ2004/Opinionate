class Env {
  static SERVER_URL: string = process.env.SERVER_APP_URL as string;
  static CLIENT_URL: string = process.env.CLIENT_APP_URL as string;
}

export default Env;
