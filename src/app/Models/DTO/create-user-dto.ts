export class CreateUserDto {
  constructor(public userName: string, public firstName: string, public lastName: string, public password: string) {
  }
}
