require('dotenv').config();
const cloudinary = require('cloudinary').v2;


function uploadPhoto(imageUrl, publicId) {

  cloudinary.config({
    cloud_name: "dwo1dblr2",
    api_key: "711814956361979",
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  

  // Upload
  const res = cloudinary.uploader.upload(imageUrl, { public_id: publicId })

  res.then((data) => {
    // console.log(data);
    // console.log(data.secure_url);
  }).catch((err) => {
    console.log(err);
  });


  // Generate 
  const url = cloudinary.url(publicId, {
    width: 150,
    height: 150,
    Crop: 'fill'
  });

  // The output url
  return url
  // console.log(url);
  // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag

}

module.exports = { uploadPhoto };