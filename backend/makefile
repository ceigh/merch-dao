BIN=node_modules/.bin/

RUN=--require dotenv/config src/server dotenv_config_path=../.env
dev:
	NODE_ENV=development ${BIN}ts-node-dev ${RUN}
start:
	${BIN}ts-node ${RUN}
