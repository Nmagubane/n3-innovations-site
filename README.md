# N³ Innovations website

Single-page static site for N³ Innovations, a South African mining company that starts with technology (AI and sensor intelligence for mines) and is building towards mine rehabilitation and mining.

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

## Changing the contact email

The email address is set once, near the bottom of `index.html`:

```js
var CONTACT_EMAIL = 'qhubela_nk@live.com';
```

Change it there, and also in the two `href="mailto:..."` fallbacks and the visible address in the Contact section, so the page is right even before its script runs.

## Before going live, confirm

- Formal company titles for the three co-founders. The site shows names and co-founder roles only.
- Whether the study lead's mobile number should be public.
- The product name "N³ Action Ledger" (a working name).
- That each of the six services can be delivered from the first engagement.
