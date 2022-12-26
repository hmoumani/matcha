import { query } from '../../db/index';
let checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await query("select * from users where username = $1 or email = $2", [req.body.username, req.body.email]);
        if (user.rowCount > 0) {
            return res.status(400).send({
                message: "Failed! Username or email is already in use!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username and email!"
        });      
    }
}


export { checkDuplicateUsernameOrEmail };

