# N³ Innovations website

Single-page static site for N³ Innovations: the self-funded four-week operational study offered to South African mines.

Everything is in `index.html` (inline CSS and JS, fonts from Google Fonts). No build step.

## Publish on GitHub Pages

1. Create a new public repository on GitHub, for example `n3-innovations-site`.
2. Upload `index.html`, `.nojekyll` and this README to the repository root (or push this folder with git).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. After a minute the site is live at `https://<your-username>.github.io/n3-innovations-site/`.

### Custom domain (optional, later)

When N³ Innovations has its own domain:

1. In **Settings → Pages → Custom domain**, enter the domain (for example `www.example.co.za`) and save. GitHub adds a `CNAME` file.
2. At your DNS provider, add a `CNAME` record for `www` pointing to `<your-username>.github.io`.
3. For the bare domain, add `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
4. Tick **Enforce HTTPS** once the certificate is issued.

## Before going live, confirm

- The contact email. The proposal uses `qhubela_nk@live.com`; the deck uses `qhubela.nk@live.com`. The site uses the proposal's version.
- Whether the study lead's mobile number should be public.
- Surnames for Neo and Nkululeko (the site shows first names only, as the deck does).
