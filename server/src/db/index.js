import pg from 'pg'

const pool = new pg.Pool();

async function query(text, params) {
    // invocation timestamp for the query method
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        // time elapsed since invocation to execution
        const duration = Date.now() - start;
        console.log(
            'executed query', 
            {text, duration, rows: res.rowCount}
        );
        return res;
    } catch (error) {
        console.log('error in query', {text});
        throw error;
    }
};
 

export { query };
