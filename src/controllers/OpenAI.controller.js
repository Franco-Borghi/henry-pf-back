require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const generateImage = async (req, res) => {

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const { motorcycle, brand, color, style, background, typeOfImage } = req.body

    try {

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Please create a detailed prompt to create a ${typeOfImage || "photograph"} on the style of ${style || "Japanese Ukiyo-e"} of a ${color || "Red"} ${brand || "BMW"} ${motorcycle || "GS1200"} motorcycle with ${background || "Space bright nebula"} as its background. The prompt need to be in one paragraph and under 400 characters. Make sure you include the ${style || "Japanese Ukiyo-e"} in the prompt and to include in the prompt.`
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