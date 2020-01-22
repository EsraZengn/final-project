import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send('No user exists with specified email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Passwords do not match');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json(token);
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};
