# public/resume/

Place your resume PDF here.

## ⚠️ Action Required

**You must place your resume PDF at this exact path:**

```
public/resume/resume.pdf
```

The resume page (`/resume`) redirects visitors to `/resume/resume.pdf`.

## Steps

1. Export your resume as a PDF.
2. Name it exactly: `resume.pdf`
3. Place it in this folder: `public/resume/resume.pdf`

## Note on the old file

A legacy `public/resume.pdf` file exists at the project root from the original template.
That path now permanently redirects to `/resume/resume.pdf` (configured in `next.config.ts`).
You do not need to delete the old file — it will redirect automatically.

Once you place your own PDF at `public/resume/resume.pdf`, visitors will receive your resume.

## Do NOT rename the file

The redirect in `app/(main)/resume/page.tsx` is hardcoded to `/resume/resume.pdf`.
