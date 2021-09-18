import { Pagination, IPaginationMeta } from "nestjs-typeorm-paginate";

export type PaginatedResponse<T> = Pagination<T, IPaginationMeta>;
