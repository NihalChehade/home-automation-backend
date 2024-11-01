DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
    "username" varchar(25) NOT NULL,
    "password" varchar(255) NOT NULL,
    "first_name" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "email" varchar(100) NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "username"
    ),
    CONSTRAINT "uc_users_email" UNIQUE (
        "email"
    )
);

DROP TABLE IF EXISTS "devices";
CREATE TABLE "devices" (
    "name" varchar(100) NOT NULL,
    "type" varchar(50) NOT NULL,
    "status" varchar(50) NOT NULL,
    "brightness" int DEFAULT 0, -- Added brightness field (integer percentage)
    "color" varchar(50) DEFAULT 'white', -- Added color field (name of the color)
    "username" varchar(25) NOT NULL,
    CONSTRAINT "pk_devices" PRIMARY KEY (
        "name"
    )
);

DROP TABLE IF EXISTS "automations";
CREATE TABLE "automations" (
    "id" int NOT NULL,
    "name" varchar(100) NOT NULL,
    "trigger_type" varchar(50) NOT NULL,
    "trigger_value" varchar(100) NOT NULL,
    "action" varchar(100) NOT NULL,
    "device_name" varchar(100) NOT NULL,
    CONSTRAINT "pk_automations" PRIMARY KEY (
        "id"
    )
);

DROP TABLE IF EXISTS "logs";
CREATE TABLE "logs" (
    "id" int NOT NULL,
    "device_name" varchar(100) NOT NULL,
    "action" varchar(100) NOT NULL,
    "timestamp" time NOT NULL,
    CONSTRAINT "pk_logs" PRIMARY KEY (
        "id"
    )
);

ALTER TABLE "devices" ADD CONSTRAINT "fk_devices_username" FOREIGN KEY("username")
REFERENCES "users" ("username");

ALTER TABLE "automations" ADD CONSTRAINT "fk_automations_device_name" FOREIGN KEY("device_name")
REFERENCES "devices" ("name");

ALTER TABLE "logs" ADD CONSTRAINT "fk_logs_device_name" FOREIGN KEY("device_name")
REFERENCES "devices" ("name");
