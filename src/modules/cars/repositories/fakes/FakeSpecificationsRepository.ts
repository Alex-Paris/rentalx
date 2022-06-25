import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationRepository {
  specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id)
    );
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      specification => specification.name === name
    );
    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
}

export default FakeSpecificationsRepository;
