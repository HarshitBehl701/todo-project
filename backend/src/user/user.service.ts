import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUser(id: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                id: +id
            }
        })
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        // Check Unique
        if ((await this.prisma.user.findFirst({
            where: {
                username: data.username
            }
        }))) {
            throw new Error("User Already Exists")
        }
        return this.prisma.user.create({
            data
        })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput
        data: Prisma.UserUpdateInput
    }): Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where
        })
    }
}
