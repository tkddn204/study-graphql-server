import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import path from "path";
import { Upload } from "src/types/Upload";
import { Arg, Mutation, Resolver } from "type-graphql";


@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload)
    {
      createReadStream,
      filename
    }: Upload): Promise<boolean> {
    return new Promise(async (res, rej) =>
      createReadStream()
        .pipe(createWriteStream(path.join(__dirname, `/../../images/${filename}`)))
        .on("finish", () => res(true))
        .on("error", () => rej(false))
    );
  }
}