const Busboy = require("busboy");
const os = require("os");
const path = require("path");
const fs = require("fs");
const {logger} = require("firebase-functions/v1");

async function extractMultipartFormData(req, res, next) {
  try {
    return await new Promise((resolve, reject) => {
      const busboy = Busboy({headers: req.headers});
      const tmpdir = os.tmpdir();
      const fields = {};
      const fileWrites = [];
      const uploads = {};

      busboy.on("field", (fieldname, val) => (fields[fieldname] = val));

      busboy.on("file", (fieldname, file, filename) => {
        const filepath = path.join(tmpdir, filename.filename);
        const writeStream = fs.createWriteStream(filepath);

        uploads[fieldname] = filepath;

        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
          file.on("end", () => {
            writeStream.end();
          });
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        fileWrites.push(promise);
      });

      busboy.on("finish", async () => {
        const result = {fields, uploads: {}};

        await Promise.all(fileWrites);

        for (const file in uploads) {
          const filename = uploads[file];
          result.uploads[file] = fs.readFileSync(filename);
          fs.unlinkSync(filename);
        }

        req.body = {...result.fields, uploads: result.uploads};
        next();
      });

      busboy.on("error", reject);

      try {
        req.rawBody;
        if (req.rawBody) {
          busboy.end(req.rawBody);
        } else {
          req.pipe(busboy);
        }
      } catch (err) {
        reject(err);
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

module.exports = {extractMultipartFormData};
