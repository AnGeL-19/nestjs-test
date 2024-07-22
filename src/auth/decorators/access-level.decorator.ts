import { SetMetadata } from "@nestjs/common";
import { ACCESS_LEVEL_KEY } from "../../constants/key-decorators";
import { ACCESS_LEVEL } from "../../constants/roles";

export const LevelAccess = (level: ACCESS_LEVEL) => 
    SetMetadata(ACCESS_LEVEL_KEY, level);
