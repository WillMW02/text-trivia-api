import { hash } from "bcrypt";

const salt_rounds = 10;

const hashPassword = async (password) => {
    return await hash(password, salt_rounds);
}