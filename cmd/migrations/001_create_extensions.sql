-- Write your migrate up statements here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET timezone = 'UTC';

---- create above / drop below ----

DROP EXTENSION IF EXISTS "uuid-ossp";

-- Write your migrate down statements here. If this migration is irreversible
-- Then delete the separator line above.
