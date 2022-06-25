import CarImage from '../infra/typeorm/entities/CarImage';

interface ICreateCarImageDTO {
  car_id: string;
  image_name: string;
}

interface ICarsImagesRepository {
  create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository, ICreateCarImageDTO };
