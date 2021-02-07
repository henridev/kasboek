export declare namespace Database {
    const uri: string | undefined;
    const client = "pg";
    const schema = "public";
    const database: string | undefined;
    const user: string;
    const password: string;
    const hostname: string;
    const host: string;
    const port: number;
    const poolMin: number;
    const poolMax: number;
    const timezone = "Europe/Paris";
    const migration_dir: string;
    const seed_dir: string;
}
export declare enum T {
    SCHEMA = "public",
    KASBOEK = "T_KASBOEK",
    SERVICE = "T_SERVICE"
}
