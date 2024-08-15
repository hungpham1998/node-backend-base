/* eslint-disable class-methods-use-this */
/* eslint-disable security/detect-non-literal-fs-filename */
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

class StoragePathFile {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  async _handleFile(req, file, cb) {
    try {
      const destination = `${config.UPLOAD_PATH}`;
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, {
          recursive: true,
        });
      }
      const fileName = file.originalname;
      const filePath = path.join(destination, fileName);
      return file.stream
        .pipe(fs.createWriteStream(filePath))
        .on('error', (error) => {
          cb(error);
        })
        .on('finish', async () => {
          cb(null, {
            ...file,
            path: `${destination}/${fileName}`,
            filename: fileName,
          });
        });
    } catch (err) {
      return cb(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
  }

  _removeFile(req, file, cb) {
    const filePath = file.path;
    fs.unlink(filePath, cb);
  }
}

const storageUpload = multer({ storage: new StoragePathFile() });

module.exports = storageUpload;
