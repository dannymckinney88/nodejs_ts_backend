import { Router } from 'express';
import User from '../models/user.model';
import Profile from '../models/profile.model';
import bcrypt from "bcryptjs";

const router = Router();

router.post('/register', async (req, res) => {
    // console.log("I am the request body" ,req.body.password_hash);

    const saltRounds = 10; // Number of salt rounds

let hash: string; 

// Hashing password
bcrypt.hash(req.body.password_hash, saltRounds, (hashErr: Error | null, hashedPassword: string) => {
    if (hashErr) {
      // Handle hashing error
      console.error('Error hashing password:', hashErr);
    } else {
      // Store hash in database
      hash = hashedPassword;
    //   console.log('Hashed password:', hash);
  
      // Verifying password
      bcrypt.compare(req.body.password_hash, hash, (compareErr: Error | null, result: boolean) => {
        if (compareErr) {
          // Handle comparison error
          console.error('Error comparing passwords:', compareErr);
        } else if (result) {
          // Passwords match
          console.log('Passwords match');
          req.body.password_hash = hash;
          console.log("I am the request body" ,req.body.password_hash);
        } else {
          // Passwords do not match
          console.log('Passwords do not match');
        }
      });
    }
  });

    
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
  console.log(email, password_hash);
  


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
