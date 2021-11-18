dev:
	pnpx vite --host

debug: build
	pnpx vite --host --port=3000 preview

build: npmi
	pnpx vite build

dep:
	pnpm up --latest

fmt:
	pnpx prettier -w ./src

npmi:
	pnpm install

pkg: npmi
	rm -rf dist/
	pnpx tsc -p ./tsconfig.src.json

publish: pkg
	npm publish
