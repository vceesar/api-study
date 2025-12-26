export class GetUserByEmailController {
    constructor(GetUserByEmaiLUseCase) {
        this.GetUserByEmaiLUseCase = GetUserByEmaiLUseCase
    }
    static create(GetUserByEmaiLUseCase) {
        return new GetUserByEmailController(GetUserByEmaiLUseCase)
    }

    async execute() {}
}
