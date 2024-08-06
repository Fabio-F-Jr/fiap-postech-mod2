import { env } from '@/env'
import { Pool, PoolClient } from 'pg'

const CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
}

export class Database {
  private pool: Pool
  public client: PoolClient | undefined
  public db = new Database()

  private async connection() {
    try {
      this.client = await this.pool.connect()
      console.log(this.client + 'a')
      console.log(this.pool)
    } catch (error) {
      console.error(`erro na conexão, erro ${error}`)

      throw new Error(`erro na conexão, erro ${error}`)
    }
  }

  static async createInstance(db: Database): Promise<Database> {
    await db.connection()
    return db
  }

  constructor() {
    this.pool = new Pool(CONFIG)
  }

  get clientIstance() {
    return this.client
  }

  finalizar() {
    return this.pool.end()
  }
}
