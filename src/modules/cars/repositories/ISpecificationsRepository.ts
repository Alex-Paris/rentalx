import Specification from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Specification | undefined;
  create({ description, name }: ICreateSpecificationDTO): void;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
