const cloudinary = require("cloudinary").v2 //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
			
		});
		console.log("Cloud Name:", process.env.CLOUD_NAME)
console.log("API Key:", process.env.API_KEY)

	} catch (error) {
		console.log(error);
	}
};