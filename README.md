<h2 align="center">ITCS 3050 - CMS Template</h2>

This is a [Tina CMS](https://tina.io/) project.

## Goals

This project is meant as a template for future projects, showing the usage of TinaCMS as a GitHub based Content Management System.  

### Technologies Used

The following are the technologies used, linked to getting started tutorials on the usage of them.

- [Next.js](https://nextjs.org/docs/getting-started)
  - React framework to ease the difficulty of static rendering and routing when using dynamic content.
- [React Components](https://reactjs.org/docs/components-and-props.html)
  - Allows the splitting of UI into independent reusable pieces, keeping complex projects organized and manageable.
- [Styled JSX](https://github.com/vercel/styled-jsx#getting-started)
  - Component defined CSS styling, allows for scoped manageable styling in large split projects.
- [TinaCMS](https://tina.io/docs/setup-overview/)
  - Git-backed CMS, uses [GraphQL](https://graphql.org/learn/) to query data stored in [MDX](https://mdxjs.com/docs/) files, and allows for multiple users to create content without knowing how to code.
  
### Project Structure

#### Components

- The layout component is used to render the header and footer of the site.
- The logo component is used to render the logo of the site.
- The post component is used to render the individual posts.
- The post list component is used to render the list of posts.

#### Folder Structure

📦3050TinaCMS - *Main Project Folder*
 ┣ 📂.tina - *GraphQL Structure (TinaCMS)* 
 ┃ ┣ 📂__generated__ - *Generated files*
 ┃ ┃ ┣ 📜frags.gql - *Fragments for TinaCMS*
 ┃ ┃ ┣ 📜queries.gql - *GraphQL Queries*
 ┃ ┃ ┣ 📜schema.gql - *GraphQL Schema*
 ┃ ┃ ┣ 📜types.ts - *GraphQL Types*
 ┃ ┃ ┣ 📜_graphql.json - *GraphQL Configuration*
 ┃ ┃ ┣ 📜_lookup.json - *Lookup Configuration*
 ┃ ┃ ┗ 📜_schema.json - *Schema Configuration*
 ┃ ┗ 📜schema.ts - *Schema for TinaCMS*
 ┣ 📂components - *Components*
 ┃ ┣ 📜Layout.js - *Layout Component*
 ┃ ┣ 📜Logo.js - *Logo Component*
 ┃ ┣ 📜Post.js - *Post Component*
 ┃ ┗ 📜PostList.js - *Post List Component*
 ┣ 📂content - *Content*
 ┃ ┣ 📂parent - *Parent Content*
 ┃ ┣ 📂student - *Student Content*
 ┃ ┃ ┗ 📜testPost3.mdx - *Example Post*
 ┃ ┗ 📂teacher - *Teacher Content*
 ┣ 📂pages - *Pages*
 ┃ ┣ 📂admin - *Admin Pages*
 ┃ ┃ ┗ 📜[[...slug]].js - *Admin Page*
 ┃ ┣ 📂api - *API Pages*
 ┃ ┃ ┗ 📂cloudinary - *Cloudinary API Page*
 ┃ ┃ ┃ ┗ 📜[...media].js - *Cloudinary API Setup Page*
 ┃ ┣ 📂parent - *Parent Pages*
 ┃ ┃ ┣ 📜index.js - *Parent Home Page*
 ┃ ┃ ┗ 📜[slug].js - *Parent Post Slug Page*
 ┃ ┣ 📂student - *Student Pages*
 ┃ ┃ ┣ 📜index.js - *Student Home Page*
 ┃ ┃ ┗ 📜[slug].js - *Student Post Slug Page*
 ┃ ┣ 📂teacher - *Teacher Pages*
 ┃ ┃ ┣ 📜index.js - *Teacher Home Page*
 ┃ ┃ ┗ 📜[slug].js - *Teacher Post Slug Page*
 ┃ ┣ 📜index.js - *Home Page*
 ┃ ┣ 📜media.js - *Media Page*
 ┃ ┣ 📜_app.js - *App Page, Main application setup*
 ┃ ┗ 📜_document.js - *Document Page, Main HTML document setup*
 ┣ 📂public - *Public Files*
 ┃ ┣ 📜favicon.ico - *Favicon*
 ┃ ┗ 📜vercel.svg - *Vercel Logo*
 ┣ 📂styles - *Styles*
 ┃ ┗ 📜default.css - *Default Global CSS*
 ┣ 📜next.config.js - *Next.js Configuration*
 ┣ 📜package-lock.json - *Package Lock*
 ┣ 📜package.json - *Package JSON*

#### Content Structure

- Content schema is configured in the TinaCMS schema.gql file.
- Currently, the posts are sperated into 3 different groups, parent, student, and teacher.
- Posts are stored in MDX files, and are rendered using Next.js, with the Post component.
- Post content is laid out in the following configuration:

```gql
{
      label: "Student Posts",
      name: "student",
      path: "content/student",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
        {
          type: "datetime",
          label: "Posted Date",
          name: "date",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
        },
        {
          type: "rich-text",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
        },
      ],
    },
```

- Content is queried using the [```getStaticProps```](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) function in the ```pages/.../[slug].js``` files, which queries the GraphQL database for post data, and prerenders the data with a static output with Next.js.
- The ```getStaticProps``` function is also used to prerender the data for the list of posts, and is called in the ```pages/.../index.js``` files.

### Styling

Styling is done using [Styled JSX](https://github.com/vercel/styled-jsx#getting-started), no import of the library is necessary, since it is bundled in Next.js.
Below is an example used in the ```Post.js``` component:

  ```js
      <style jsx global>{`
        .post {
          max-width: 56rem;
          padding-top: 2rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 2rem;
          padding-right: 2rem;
          font-size: 1.125rem;
        }
        .post > img {
          max-width: 100%;
          height: auto;
        }
        .title {
          font-weight: 800;
          font-size: 4rem;
          text-align: center;
          width: 100%;
          margin-bottom: 2rem;
        }
        .post img {
          max-width: 100% !important;
          height: auto !important;
        }
        .author {
        }
        .date {
        }
        @media screen and (max-width: 620px) {
          .post {
            font-size: 0.9rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .title {
            font-size: 2.5rem;
          }
        }
      `}</style>
  ```

- The ```global``` class is used to apply the styles to all pages.
- Note that the ```<style>``` tag needs to be within the wrapping component tag, and will throw errors if outside of the components scope.
- React requires ```className``` to be used instead of ```class``` for styling.

## Getting Started

To run this project locally, run the development server after cloning:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Tina, take a look at the following resources:

- [Tina Docs](https://tina.io/docs)
- [Getting starter guide](https://tina.io/guides/tina-cloud/starter/overview/)

You can check out [Tina Github repository](https://github.com/tinacms/tinacms) - your feedback and contributions are welcome!

## [Deploy on Vercel](https://tina.io/guides/tina-cloud/add-tinacms-to-existing-site/deployment/)
