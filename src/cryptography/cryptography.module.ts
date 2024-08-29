import { Module } from "@nestjs/common";
import { HashGenerator } from "./hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashComparer } from "./hash-comparer";


@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptoGraphyModule { }