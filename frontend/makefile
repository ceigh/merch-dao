BIN=node_modules/.bin/

LINT_OPTS=--ignore-path ../.gitignore
lint-es:
	${BIN}eslint ${LINT_OPTS} --ext .vue,.ts,.js .
lint-style:
	${BIN}stylelint ${LINT_OPTS} **/*.{vue,css}
lint: lint-es lint-style
