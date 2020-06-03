-- Write your migrate up statements here
CREATE TABLE "mahi_transformations"
(
    "id"             uuid                                                         DEFAULT uuid_generate_v4(),
    "application_id" uuid REFERENCES mahi_applications ON DELETE CASCADE NOT NULL,
    "file_id"        uuid REFERENCES mahi_files ON DELETE CASCADE        NOT NULL,
    "actions"        jsonb NOT NULL,
    "created_at"     timestamptz                                         NOT NULL DEFAULT now(),
    "updated_at"     timestamptz                                         NOT NULL DEFAULT now(),
    UNIQUE (file_id, actions),
    PRIMARY KEY ("id")
);

ALTER TABLE mahi_usages ADD COLUMN unique_transformations bigint DEFAULT 0 NOT NULL;
---- create above / drop below ----
DROP TABLE mahi_transformations;
ALTER TABLE mahi_usages DROP COLUMN unique_transformations;
-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
