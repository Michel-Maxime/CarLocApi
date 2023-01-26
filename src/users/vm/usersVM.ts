import CarVM from '../../cars/vm/car.vm';

export default class UserVM {
  id: string;
  email: string;
  createdAt: Date;
  cars: CarVM[];
}
