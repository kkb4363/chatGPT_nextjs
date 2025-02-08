import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// 환경변수에 넣었던 connection string을 이용해 neon db를 연결시켜주는 코드
const sql = neon(process.env.DATABASE_URL!);
// neon client객체를 drizzle함수에 넣어서 drizzle orm 인스턴스를 만들어주는 코드
const db = drizzle(sql, { schema });

export default db;
