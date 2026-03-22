class Env {
  static SERVER_URL: string =
    process.env.NEXT_PUBLIC_SERVER_APP_URL || process.env.SERVER_APP_URL || "";
  static CLIENT_URL: string =
    process.env.NEXT_PUBLIC_CLIENT_APP_URL || process.env.CLIENT_APP_URL || "";
}

export default Env;
