# robocollective.ai (Rebuild)

This repo reimagines the landing page by blending the reference aesthetic with the requested palette and wiring the copy to a Strapi single type.

## Run locally

1. `python -m venv venv` (optional isolation)
2. `venv\\Scripts\\activate` (Windows) or `source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `python server.py`
5. Open `http://127.0.0.1:5000` in a browser (the same backend/rewrite is served through Flask).

## Strapi CMS

Content lives in the `Landing` single type described in `STRAPI.md`. Run Strapi (`npm run develop`) in a sibling folder, grant the Public role `find`/`findOne` permissions, and keep it running so `scripts.js` can fetch `http://localhost:1337/api/landing?populate=deep` (override `window.STRAPI_URL` in `index.html` when pointing to another host).

## Merged workflow notes

1. Point the frontend at the merged Strapi host before shipping the changes. The deployed instance (for example `https://strapi.robocollective.ai`) should be assigned to `window.STRAPI_URL` prior to loading `scripts.js` so the landing copy hydrates from the live CMS. You can do this by inserting `<script>window.STRAPI_URL = "https://strapi.robocollective.ai";</script>` near the top of `index.html` or by controlling the global from your deployment pipeline.
2. If you run the Flask server in a container or cloud service, expose the Strapi URL via an environment variable (e.g., `export ROBO_STRAPI_URL="https://strapi.robocollective.ai"`) and normalize it inside `scripts.js` before calling the API so you never hardcode a local host. That way the fallback only applies during local development.
3. After confirming Strapi content in the merged CMS, re-run `python server.py`, verify the landing page renders the new copy, then redeploy the Flask site (push to whatever host you use or re-run your CI workflow) so the merged website and Strapi content go live together.
