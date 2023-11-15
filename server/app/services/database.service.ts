import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {

  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "root",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public async query(sql: string, params?: any[]): Promise<any> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(sql, params);
      client.release();
      return result.rows;
    } catch (err) {
      console.error('Database query error', err);
      throw err;
    }
  }
}
