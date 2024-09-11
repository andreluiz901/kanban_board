import { Injectable } from "@nestjs/common";
import { BoardsRepository } from "src/domain/repositories/boards.repository";
import { UniqueEntityId } from "src/domain/entities/unique-entity-id";
import { PrismaService } from "../../prisma.service";
import type { Board } from "src/domain/entities/board";
import { PrismaBoardMapper } from "src/infrastructure/mappers/prisma-board.mapper";

@Injectable()
export class PrismaBoardRepository implements BoardsRepository {
	constructor(private prisma: PrismaService) {}

	async create(board: Board): Promise<void> {
		const data = PrismaBoardMapper.toPrisma(board);

		await this.prisma.board.create({
			data,
		});
	}
}
