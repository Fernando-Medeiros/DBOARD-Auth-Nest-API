import { PrismaClientKnownRequestError as PrismaRequestError } from '@prisma/client/runtime';

type MetaOptions = { meta?: { target: string } };

export default class extends Error {
    constructor(e: PrismaRequestError & MetaOptions) {
        const target = e.meta.target;

        super(`conflict action: ${target}`);
    }
}
