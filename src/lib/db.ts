import { neon } from '@neondatabase/serverless'

// Direct Neon SQL client for serverless environments
export const sql = neon(process.env.DATABASE_URL!)

export default sql
