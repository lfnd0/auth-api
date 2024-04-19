export abstract class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public cpfCnpj: string,
    public password: string,
    public hasActiveSession: boolean = false,
    public createdAt: Date,
    public updateAt: Date | null,
  ) {}
}
