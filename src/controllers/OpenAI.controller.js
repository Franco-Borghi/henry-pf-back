require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const generateImage = async (req, res) => {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const { motorcycle, brand, color, style, background } = req.body

    console.log("prueba")
    try {

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Please create a detailed prompt to create a ${style} of a ${color} ${brand} ${motorcycle} motorcycle with ${background} as its background. The prompt NEEDS to be in one paragraph. No line jumps. Make sure you include the ${style} in the prompt and that the motorcycle is fully visible in its entirety`
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