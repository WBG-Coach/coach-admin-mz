import AWS from "aws-sdk";
import { AnswerFile } from "../store/type";

export const uploadFileToS3 = (
  file: File,
  folderName: string
): Promise<AnswerFile> => {
  return new Promise((resolve, reject) => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    });

    const myBucket = new AWS.S3({
      region: "us-east-1",
    });

    const hash = makeHash(16);

    const params = {
      Body: file,
      Key: `${folderName}/${hash}.${file.type.split("/")[1]}`,
      ACL: "public-read",
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME || "",
    };

    myBucket
      .putObject(params)
      .on("complete", () => {
        resolve({
          url: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_BUCKET_NAME}/${params.Key}`,
          name: file.name,
        });
      })
      .send((err: any) => {
        if (err) reject(err);
      });
  });
};

export const getLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

function makeHash(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
