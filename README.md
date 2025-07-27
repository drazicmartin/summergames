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


Access supabase dashboard with:
- user : `supabase`
- password : `this_password_is_insecure_and_should_be_updated`