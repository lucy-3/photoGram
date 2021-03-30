const express = require('express');
const passport = require('passport');
const Profile = require('../../models/Profile');
const router = express.Router();

//Load Profile and User Model
const User = require("../../models/User");

//Load Validation
const validateProfileInput = require("../../validation/profile");


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {session:false}),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get data
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile){
          //Edit
          Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
          ).then(profile => res.json(profile));
        } else {
          //Create
          Profile.findOne({handle: profileFields.handle})
            .then(profile => {
              if (profile){
                return res.status(400).json({handle: "That handle already exists"});
              }

              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router;