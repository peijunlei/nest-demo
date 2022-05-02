import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number)//确保传入的值被解析为数字
  readonly pageNum: number;

  @IsOptional()
  @IsPositive()
  readonly pageSize: number;
}
