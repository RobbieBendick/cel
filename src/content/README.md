# How to update the site (no coding)

You only need to change files in this folder, plus drop images into the image folders.

## Add a new image

1. Save the image into one of these folders:
   - Photography: `public/photography/`
   - Illustrations/Projects: `public/illustrations/`
2. Open the matching file here:
   - Photography: `photography.json`
   - Illustrations/Projects: `designs.json`
3. Copy one existing block (from `{` to `},`) and paste it where you want the image to appear. **First in the list = first in that year.**
4. Change the fields:

```
{
  "file": "my-new-photo.png",
  "year": 2025,
  "title": "My New Photo",
  "subtitle": "Illustration",
  "description": "A short third line under the image."
},
```

- `file` must match the image filename exactly (including `.png` or `.jpg`).
- `year` groups Illustrations/Projects and Photography into sections. Newest years appear first.
- `subtitle` is the middle line on the card (project type).
- `description` is the short third line on the card.
- `story` is the longer thought-process text on the project page (right side, stays put while you scroll).
- `images` is a list of extra filenames to show on the left of the project page, after the main `file`. Use this for sketches, process shots, and alternate views.

## Open a project page

Clicking a card on Illustrations/Projects opens that project's page.

To add process images, drop files in `public/illustrations/` and list them:

```
{
  "file": "vexa.png",
  "year": 2025,
  "title": "Vexa",
  "subtitle": "Character",
  "description": "A short line on the card.",
  "story": "The longer write-up that stays visible while someone scrolls the images.",
  "images": [
    "vexa-sketch.png",
    "vexa-color.png",
    "vexa-detail.png"
  ]
}
```

The first image is always `file`. Extra `images` follow it: one full-width, then two side-by-side, then full-width, and so on.

## Remove an image

1. Delete its whole `{ ... },` block from the JSON file.
2. Optionally delete the image file from `public/photography/` or `public/illustrations/`.

## Sketchbook

The Sketchbook tab is an open book you can flip through.

1. Save sketch images into `public/illustrations/` (or change `"folder"` below).
2. Open `sketchbook.json`.
3. Add a page:

```
{
  "file": "my-sketch.png",
  "note": "A scribble in the corner."
}
```

- First in the list is the first page of the book.
- `note` is the handwriting under the drawing.
- On a computer you see two pages at a time. Click the right side of the book (or Next) to turn forward; the left side turns back.

To use a dedicated sketch folder later, put files in `public/sketchbook/` and set `"folder": "sketchbook"` at the top of `sketchbook.json`.

## About Me

Edit `about.json` to change the portrait, bio, and the three focus lines.

- `portraitFile` is the image filename.
- `portraitFolder` is `photography` or `illustrations`.
- `bio` is a list of paragraphs.
- `cta` is the email button label. The address still comes from `site.json`.
- `href` on a focus card is optional. Use a site path like `/photography` to make that card a link.

## Change homepage text, email, or Instagram

Edit `site.json`.

## Featured images

The old home page is hidden for now. `"featured": true` is still available if you bring that page back.

## Rules that break the site

- Do not delete commas between blocks.
- Do not add a comma after the last block in a list.
- Use straight quotes `"like this"`, not curly quotes.
- If the site goes blank after an edit, you likely have a missing comma or quote. Undo and try again.
