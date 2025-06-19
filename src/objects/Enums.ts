export enum RequestVerbType {
  Get = "GET",
  Post = "POST",
  Update = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export enum RequestSecurityType {
  Protected = "PROTECTED",
  Signed = "SIGNED",
  Public = "PUBLIC",
}

export enum TxStatusType {
  Awaiting = "AWAITING",
  Executed = "EXECUTED",
  Confirmed = "CONFIRMED",
}

export enum GameEventType {
  Start = "start",
  End = "end",
  KeyPress = "key_press",
}

export enum RoleType {
  User = "USER",
  Admin = "ADMIN",
}

export enum JobType {
  MineBlockJob = "MINE_BLOCK_JOB",
}
