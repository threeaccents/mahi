-- Write your migrate up statements here
CREATE TABLE "mahi_files"
(
    "id"             uuid                                                         DEFAULT uuid_generate_v4(),
    "application_id" uuid REFERENCES mahi_applications ON DELETE CASCADE NOT NULL,
    "file_blob_id"   text UNIQUE                                         NOT NULL,
    "filename"       varchar(255)                                        NOT NULL,
    "size"           bigint                                              NOT NULL,
    "mime_type"      varchar(20)                                         NOT NULL,
    "mime_value"     varchar(255)                                        NOT NULL,
    "extension"      varchar(10)                                         NOT NULL,
    "url"            text UNIQUE                                         NOT NULL,
    "hash"           text,
    "created_at"     timestamptz                                         NOT NULL DEFAULT now(),
    "updated_at"     timestamptz                                         NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

---- create above / drop below ----
DROP TABLE mahi_files;

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
