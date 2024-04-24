import { Router } from 'express';
import User from '../models/user.model';
import Profile from '../models/profile.model';

const router = Router();

router.post('/register', async (req, res) => {
  const {
    email,
    password_hash, // Using password_hash to match the model field
    first_name,
    last_name,
    birthdate,
    gender,
    height,
    weight,
    activity_level,
  } = req.body;
  
  try {
    // Create new user
    const newUser = await User.create({
      email: email,
      password_hash: password_hash, // Make sure this is consistent with your model field
    });

    // Make sure the user creation was successful before proceeding
    if (!newUser) {
      return res.status(400).send('User could not be created.');
    }
  
    // Create associated profile
    const newProfile = await Profile.create({
      user_id: newUser.id, // Using user_id to match the model field
      first_name: first_name,
      last_name: last_name,
      birthdate: birthdate,
      gender: gender,
      height: height,
      weight: weight,
      activity_level: activity_level,
    });

    res.status(201).json({ user: newUser, profile: newProfile });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Registration error');
  }
});

export default router;
