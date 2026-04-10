import dotenv from'dotenv';

dotenv.config(); // it loads dotenv files into process.env by default.

const config={
    jwtsecret:process.env.SECRET_KEY!,
    dburl:process.env.DATABASE_URL
}

export default config;