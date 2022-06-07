class ImportCategoryUseCase {
  execute(file: Express.Multer.File | undefined) {
    console.log(file);
  }
}

export default ImportCategoryUseCase;
