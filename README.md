This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Fashion Product Finder from Image

A Next.js application that allows users to upload an image and find similar fashion products using AI-powered visual search.

## Features

- **Image Upload**: Drag & drop or click to upload images (JPG, PNG, SVG)
- **Visual Search**: AI-powered product matching using uploaded images
- **Product Display**: Beautiful grid layout showing found products with details
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Smooth loading animations during API calls
- **Error Handling**: Graceful error handling for failed uploads

## API Integration

The application integrates with two API endpoints:

1. **Upload Endpoint** (`/upload`): Uploads the image and returns image URL
2. **Lens Endpoint** (`/lens`): Searches for similar products using the uploaded image

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-base-url.com
```

Replace `https://your-api-base-url.com` with your actual API base URL.

## API Endpoints

### Upload Endpoint

- **URL**: `{BASE_URL}/upload`
- **Method**: POST
- **Body**: FormData with `image` field
- **Response**:

```json
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/...",
  "base64Image": "data:image/png;base64,..."
}
```

### Lens Endpoint

- **URL**: `{BASE_URL}/lens`
- **Method**: POST
- **Body**:

```json
{
  "imageUrl": "https://res.cloudinary.com/...",
  "country": "in",
  "hl": "en",
  "type": "products"
}
```

- **Response**:

```json
{
  "success": true,
  "imageUrl": "https://res.cloudinary.com/...",
  "total_results": 15,
  "visual_matches": [
    {
      "title": "Product Name",
      "link": "https://product-url.com",
      "source": "Store Name",
      "thumbnail": "https://image-url.com",
      "price": "29.99",
      "currency": "$"
    }
  ]
}
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up your environment variables (see Environment Setup above)

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload an image by dragging and dropping or clicking the upload area
2. The app will automatically upload the image and search for similar products
3. View the found products in the grid layout
4. Click "View Product" to visit the product page
5. Use "Upload New Image" to search for different products

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Dropzone** - File upload handling
- **Lucide React** - Icons
