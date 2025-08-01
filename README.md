# summergames
App for managing the summer games event !

## Start Dev Stack
```bash
# backend
docker compose -f docker/docker-compose-backend.yml up -d

# frontend
cd front; npm run dev
```

## Supabase
- REST: http://localhost:8000/rest/v1/
- Auth: http://localhost:8000/auth/v1/
- Storage: http://localhost:8000/storage/v1/
- Realtime: http://localhost:8000/realtime/v1/

### Do a backup
```bash
supabase db dump --data-only --db-url "postgres://postgres:your-super-secret-and-long-postgres-password@localhost:5432/postgres" --file data.sql
supabase db dump --db-url "postgres://postgres:your-super-secret-and-long-postgres-password@localhost:5432/postgres" --file schema.sql
```


Access supabase dashboard with:
- user : `supabase`
- password : `this_password_is_insecure_and_should_be_updated`