#!/bin/bash

# No need to copy the SQL file anymore as it's mounted directly by docker-compose
exec "$@"
