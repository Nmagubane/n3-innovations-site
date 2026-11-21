# N³ Innovations website

Static site for N³ Innovations, a South African mining technology company. Its product is N³ Mining Intelligence (fleet, fuel, maintenance and production intelligence, with compliance and safety on the same core). Longer term: closure, rehabilitation and mine development.

Pages: `index.html` (home), `technology.html` (AI use and security), `partners.html` (partners and funders), `privacy.html` (POPIA notice), `paia.html` (PAIA manual).
Shared styles and script: `assets/site.css`, `assets/site.js`. Link preview image: `assets/og-image.png`.
Company profile: `assets/N3-Innovations-Company-Profile.pdf` (regenerate when contact details change).
Also `CNAME` (custom domain, set by GitHub), `robots.txt`, `sitemap.xml`. No build step.

Live at https://www.n3innovations.co.za (DNS on Cloudflare, all records DNS only).

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

The email address is set once, in `assets/site.js`:

```js
var CONTACT_EMAIL = 'info@n3innovations.co.za';
```

Change it there, and also in the `mailto:` fallbacks in `index.html` and `privacy.html`, so pages are right even before the script runs. Then regenerate the company profile PDF.

## Still to add

- Company registration number in the footer.
- One-line credentials and LinkedIn links for each founder.
- Confirm the PAIA Information Officer and register them with the Information Regulator.
- Review the "Why now" figures every quarter.

## Before going live, confirm

- Formal company titles for the three co-founders. The site shows names and co-founder roles only.
- Whether the study lead's mobile number should be public.
- That each platform module described can be delivered at a first operation.

## Content rule

Public pages say what changes for the customer, never how we find it: no data-combination methods, detection rules, thresholds or data model. The product prototype never goes in this repository (it is public).
