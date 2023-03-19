import { query } from '../../db/index';

const checkAvatarLimit = async (req, res, next) => {
  const userId = req.userId;
  const count = await query(`SELECT count(*) FROM images WHERE user_id = $1`, [userId]);
  if (count.rows[0].count >= 5)
    return res.status(400).send({ message: 'You have reached the maximum number of images' });
  next();
};

const checkIsBlockedRelation = async (req, res, next) => {
  const userId = req.userId;
  if (req.params.id === 'mine') {
    return next();
  }
  const isBlockedOrBlocker = await query(`select * from blocked_users 
    where (blocked_id= $1 and blocker_id=$2)
    or (blocker_id= $1 and blocked_id=$2)
  `, [userId, req.params.id]);
  if (isBlockedOrBlocker.rowCount > 0) return res.status(401).send({ message: 'Unauthorized!' });
  next();
};

export { checkAvatarLimit, checkIsBlockedRelation };