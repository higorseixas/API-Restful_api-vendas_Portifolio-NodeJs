import multer from "multer";
import path from "path";
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  diretory: uploadFolder,
  storege: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hax');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
