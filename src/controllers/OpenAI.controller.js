require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const generateImage = async (req, res) => {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const { motorcycle, brand, color } = req.body

    try {

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `You are a professional dall-e prompt engineer. You are known for your detailed prompts that result in great images. Please create a prompt to give to dall-e so it can create a hyper realistic, futuristic picture of a ${color} ${brand} ${motorcycle} motorcycle in a cool situation. The motorcycle needs to be an important part of the picture but the picture needs to have more things. The prompt NEEDS to be in one paragraph. No line jumps.`
                }
            ],
        });

        const completion = response.data.choices[0].message.content;
        console.log("Completion", completion);

        const image = await openai.createImage({
            prompt: completion,
            n: 1,
            size: "1024x1024",
        });


        const image_url = image.data.data[0].url

        return res.status(200).json({
            success: true,
            message: completion,
            image: image_url
        });

    } catch (error) {

        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    generateImage
}