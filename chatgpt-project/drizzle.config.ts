import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  // out에는 drizzle kit 명령어를 통해 현재 스키마를 기반으로 마이그레이션 파일을 생성하게 되는데, 그 파일들을 위치시킬 폴더라고 보면 된다
  schema: "./db/schema.ts",
  dialect: "postgresql", //사용할 데이터베이스 종류를 명시
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
