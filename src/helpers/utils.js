
import { Storage } from "aws-amplify";
import { Buffer } from "buffer";

const uploadAssetToS3 = async (contentType, level, fileName, file) => {
    try {
        const { key } = await Storage.put(fileName, new Buffer(file, "base64"), {
            level,
            contentType
        });
        return key;
    } catch (error) {
        console.log("uploadAssetToS3.error", error.message);
        return null;
    }
}

module.exports = {
    async uploadProfileImage(fileName, file) {
        try {
            if (!file || file.startsWith("https")) {
                return file;
            }
            const image = file.replace("data:image/png;base64,", "");
            const key = await uploadAssetToS3("image/png", "protected", `${fileName}.png`, image);
            return key;
        } catch (error) {
            console.log("uploadProfileImage.error", error);
        }
    }
};