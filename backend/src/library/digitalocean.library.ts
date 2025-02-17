import path from "path";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


dotenv.config({ path: "../.env" });

const { DO_SPACES_BUCKET, DO_SPACES_KEY, DO_SPACES_REGION, DO_SPACES_ENDPOINT, DO_SPACES_SECRET } = process.env;


export async function uploadFile(file: any, route: string = "uploads"){

    console.log("upload file is run cuz")
    console.log("bucket: ",DO_SPACES_BUCKET)

    try {
    const s3 = new S3Client({
        region: String(DO_SPACES_REGION),
        endpoint: String(DO_SPACES_ENDPOINT),
        credentials: {
            accessKeyId: String(DO_SPACES_KEY),
            secretAccessKey: String(DO_SPACES_SECRET),
        },
    });

        const fileName = `${route}/${Date.now()}-${path.extname(file.originalname)}`;

        const uploadParams = {
            Bucket: String(DO_SPACES_BUCKET),
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        await s3.send(new PutObjectCommand(uploadParams));
        // const fileUrl = `https://${DO_SPACES_BUCKET}.${DO_SPACES_REGION}.digitaloceanspaces.com/${fileName}`;
        return fileName;
    }catch (error:any) {
        console.log(error);
        throw new Error("Failed to upload file to S3");
    }
}