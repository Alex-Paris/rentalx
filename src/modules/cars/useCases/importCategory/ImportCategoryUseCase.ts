import fs from 'fs';
import { parse } from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(
    file: Express.Multer.File | undefined
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      if (!file) {
        throw new AppError('Not a valid file!');
      }

      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          console.log(line);
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File | undefined) {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export default ImportCategoryUseCase;
