-- Write your migrate up statements here
CREATE TABLE "mahi_applications"
(
    "id"                 uuid                         DEFAULT uuid_generate_v4(),
    "name"               varchar(255) unique NOT NULL,
    "description"        text,
    "storage_engine"     varchar(255)        NOT NULL,
    "storage_access_key" varchar(255)        NOT NULL,
    "storage_secret_key" varchar(255)        NOT NULL,
    "storage_region"     varchar(255),
    "storage_bucket"     varchar(255)        NOT NULL,
    "storage_endpoint"   text,
    "delivery_url"       text                NOT NULL,
    "created_at"         timestamptz         NOT NULL DEFAULT now(),
    "updated_at"         timestamptz         NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

---- create above / drop below ----
DROP TABLE mahi_applications;

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
