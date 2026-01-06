## Dev Container (minimal)

This devcontainer uses the existing `todo-app/todo-backend/docker-compose.yml` to build and run the `app` service.

Quick start

1. Open the repo in VS Code.
2. Run **Remote-Containers: Reopen in Container**.

Notes

- For now it forwards port **3000** and opens the workspace at `/workspace/todo-app/todo-backend` inside the container.
- If you want Mongo/Redis included, add those services to `todo-app/todo-backend/docker-compose.yml` and add their names to `runServices` in `devcontainer.json`.
- `postCreateCommand` runs `npm install` in the backend workspace.