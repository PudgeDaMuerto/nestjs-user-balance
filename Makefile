-include .env
export $(shell sed 's/=.*//' .env)

.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

start_dev:
	yarn start:dev
