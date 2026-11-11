<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:profile-data-rules -->
# Scholar & Dossier Data Rules

- **Key Thesis, Internships & Lab Projects**: Every scholar's `projects` array (and mapped fallback in `src/lib/data.ts`) MUST explicitly include both their M.Tech thesis/course project AND summer/industrial internship work (with clear concise summaries/gist). Never omit internship work from the projects list.
- **Research Synopsis**: Write detailed ~2-paragraph synopses (`\n\n` separated) covering academic foundation, thesis focus, and all institutions/internships carried out.
- **GitHub Links**: Only add the `github` field where explicitly provided by the scholar/resume; never attach placeholder or unrequested GitHub URLs.
- **Shelf & Stack Fit**: Keep `specialization` titles concise enough to fit completely without truncation on shelf tiles and vertical stacks; avoid ALL CAPS labels anywhere in the UI.
<!-- END:profile-data-rules -->
