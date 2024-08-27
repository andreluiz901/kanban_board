import { Module } from "@nestjs/common";
import { HashGenerator } from "./hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";


@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashGenerator],
})
export class CryptoGraphyModule { }