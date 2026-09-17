import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().min(1).max(65535),
    APP_URL: z.url(),

    DATABASE_URL: z.url(),
    REDIS_URL: z.url(),

    JWT_ACCESS_SECRET: z.string().regex(/^[0-9a-f]{64}$/),
    JWT_REFRESH_SECRET: z.string().regex(/^[0-9a-f]{64}$/),
    JWT_ACCESS_EXPIRES_IN: z.string().nonempty().default('15m'),
    JWT_REFRESH_EXPIRES_IN: z.string().nonempty().default('7d'),

    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
    GOOGLE_CALLBACK_URL: z.url(),

    GITHUB_CLIENT_ID: z.string().nonempty(),
    GITHUB_CLIENT_SECRET: z.string().nonempty(),
    GITHUB_CALLBACK_URL: z.url(),

    BCRYPT_ROUNDS: z.coerce.number().min(10).max(15).default(10),
    CORS_ORIGIN: z.string().nonempty(),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1000).default(900000),
    RATE_LIMIT_MAX: z.coerce.number().positive().default(100)
})

const result = envSchema.safeParse(process.env);
if(!result.success){
    console.error('Environment variables validation failed');
    console.error(z.prettifyError(result.error));
    process.exit(1);
}

export type envType = z.infer<typeof envSchema>;
export const env: envType = result.data;

console.log('Environment variables validation succeeded');