# public/images/

Place your personal assets here.

## Profile Photo

**Expected file:** `public/images/profile.jpg`

- Recommended size: 400×400 px minimum (square)
- Accepted formats: `.jpg`, `.png`, `.webp`
- After placing the file, update the `cover_image` URL in:
  `data/static/user-details.ts`

  Change:
  ```
  cover_image: "https://placehold.co/400x400/1a1a1a/emerald?text=Rohan+Bondre"
  ```
  To:
  ```
  cover_image: "/images/profile.jpg"
  ```

> The portfolio will display your photo automatically once the path is updated.
