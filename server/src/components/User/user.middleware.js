import { query } from '../../db/index';

const avatarLimit = async (req, res, next) => {
  const userId = req.userId;
  const count = await query(`SELECT count(*) FROM images WHERE user_id = $1`, [userId]);
  if (count.rows[0].count >= 5)
    return res.status(400).send({ message: 'You have reached the maximum number of images' });
  next();
};

export { avatarLimit };