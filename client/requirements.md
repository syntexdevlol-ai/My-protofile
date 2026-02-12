## Packages
react-markdown | To render the project README files as rich HTML
framer-motion | For smooth layout transitions and modal animations

## Notes
The backend provides a list of projects at /api/projects.
Each project object contains `name`, `excerpt`, and `fullDescription`.
Images in READMEs might need special handling if they are relative paths, but for now assuming standard markdown or absolute URLs.
