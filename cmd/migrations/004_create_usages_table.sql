-- Write your migrate up statements here
CREATE TABLE "mahi_usages"
(
    "id"              uuid   DEFAULT uuid_generate_v4(),
    "application_id"  uuid REFERENCES mahi_applications ON DELETE CASCADE NOT NULL,
    "transformations" bigint DEFAULT 0                                    NOT NULL,
    "bandwidth"       bigint DEFAULT 0                                    NOT NULL,
    "storage"         bigint DEFAULT 0                                    NOT NULL,
    "file_count"      bigint DEFAULT 0                                    NOT NULL,
    "start_date"      date                                                NOT NULL,
    "end_date"        date                                                NOT NULL,
    "created_at"      timestamptz                                         NOT NULL DEFAULT now(),
    "updated_at"      timestamptz                                         NOT NULL DEFAULT now(),
    UNIQUE (application_id, start_date, end_date),
    PRIMARY KEY ("id")
);

---- create above / drop below ----
DROP TABLE mahi_usages;

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
