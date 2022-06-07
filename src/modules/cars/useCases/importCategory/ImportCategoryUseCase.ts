import fs from 'fs';
import { parse } from 'csv-parse';

class ImportCategoryUseCase {
  execute(file: Express.Multer.File | undefined) {
    if (!file) {
      throw new Error('Not a valid file!');
    }

    const stream = fs.createReadStream(file.path);

    const parseFile = parse();

    stream.pipe(parseFile);

    parseFile.on('data', async line => {
      console.log(line);
    });
  }
}

export default ImportCategoryUseCase;
