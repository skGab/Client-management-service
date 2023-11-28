import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ClientRepository {
  abstract findAll(): void;
  abstract getById(): void;
  abstract create(): void;
  abstract update(): void;
  abstract delete(): void;
}
