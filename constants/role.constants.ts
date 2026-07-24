// role status
export enum RoleStatus 
{
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}

// role status options
export const ROLE_STATUS_OPTIONS = Object.values(RoleStatus);

// User status
export enum UserStatus 
{
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
}

// User status option
export const USERS_STATUS_OPTIONS = Object.values(UserStatus);